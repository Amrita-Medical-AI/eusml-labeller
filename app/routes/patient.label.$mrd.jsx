import { Form, useLoaderData, useActionData } from "@remix-run/react";
import {
  getPatientByMRD,
  putProcedureTimeStamps,
} from "~/models/patient.server";
import { json, redirect } from "@remix-run/node";
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon, ArrowCircleRightIcon } from "@heroicons/react/solid";

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function Stopwatch() {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timer, setTimer] = useState(null);
  
    useEffect(() => {
      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }, [timer]);
  
    const toggleTimer = () => {
      if (!timer) {
        setTimer(setInterval(() => setEndTime((prevTime) => prevTime + 1), 1000));
      } else {
        clearInterval(timer);
        setTimer(null);
      }
    };
  
    const resetTimer = () => {
        setEndTime(0);
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    };
  
    return (
        <div className="flex flex-col gap-2 items-center">
          <div
            className="flex flex-row items-center justify-center gap-4 p-2 bg-teal-400 rounded w-48 h-14"
          >
            <span className="text-lg text-white font-mono">
              {formatTime(endTime)}
            </span>
          </div>
          <div
            className="flex flex-row items-center bg-blue-500 rounded p-2"
          >
            <label
              className="text-3xl text-white"
              style={{ alignSelf: "flex-start" }}
            >
              Start Procedure
            </label>
            <button
              type="button"
              onClick={toggleTimer}
              className="rounded-full p-1 bg-blue-400 hover:bg-blue-500 focus:bg-blue-300 ml-2"
            >
              {timer ? (
                <StopIcon className="h-6 w-6 text-white" />
              ) : (
                <PlayIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
          <input type="hidden" name="startProcedure" value={startTime} />
          <input type="hidden" name="stopProcedure" value={endTime} />
        </div>
      );
  }

export const loader = async ({ request, params }) => {
  const patientMRD = params.mrd;
  const patient = await getPatientByMRD({ patientMRD });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const patientMRD = params.mrd;
  const startProcedure = formData.get("startProcedure");
  const stopProcedure = formData.get("stopProcedure");

  const procedureTimeStap = await putProcedureTimeStamps({
    patientMRD,
    startProcedure,
    stopProcedure,
  });

  return redirect(`/patient/${patientMRD}`);
};

export default function Label() {
  const actionData = useActionData();
  const data = useLoaderData();

  return (
    <div className="flex min-h-screen flex-row items-start justify-center bg-slate-600">
      <div className="flex flex-col items-center">
        <h1 className="p-2 text-center text-4xl font-bold text-white">MRD</h1>
        <h1 className="p-2 text-center text-4xl font-bold text-teal-400">
          {data.patient.mrd}
        </h1>
        <Form
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "45vh",
          }}
        >
          <Stopwatch />
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
