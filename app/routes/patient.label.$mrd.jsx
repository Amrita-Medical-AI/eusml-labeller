import { Form, useLoaderData, useActionData } from "@remix-run/react";
import {
  getPatientByMRD,
  putStation1TimeStamps,
} from "~/models/patient.server";
import { json, redirect } from "@remix-run/node";
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [startTimestamp, setStartTimestamp] = useState(0);
  const [stopTimestamp, setStopTimestamp] = useState(0);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const toggleTimer = () => {
    if (!timer) {
      setStartTimestamp(Date.now());
      setTimer(setInterval(() => setTime((prevTime) => prevTime + 1), 1000));
    } else {
      clearInterval(timer);
      setTimer(null);
      setStopTimestamp(Date.now());
    }
  };

  const resetTimer = () => {
    setTime(0);
    setStartTimestamp(0);
    setStopTimestamp(0);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-teal-400">Stopwatch</label>
      <span className="font-mono text-lg">{formatTime(time)}</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={toggleTimer}
          className="rounded-full bg-teal-400 p-1 hover:bg-teal-500 focus:bg-teal-300"
        >
          {timer ? (
            <StopIcon className="h-6 w-6 text-white" />
          ) : (
            <PlayIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="rounded-full bg-red-400 p-1 hover:bg-red-500 focus:bg-red-300"
        >
          <StopIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      <input type="hidden" name="station1Start" value={startTimestamp} />
      <input type="hidden" name="station1Stop" value={stopTimestamp} />
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
  const station1Start = formData.get("station1Start");
  const station1Stop = formData.get("station1Stop");

  const station1TimeStps = await putStation1TimeStamps({
    patientMRD,
    station1Start,
    station1Stop,
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
          <label className="text-3xl text-teal-400">Station 1</label>
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
