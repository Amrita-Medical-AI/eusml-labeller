import { Form } from "@remix-run/react";
import {
  getPatientById,
  putProcedureTimeStamps,
} from "~/models/patient.server";
import { json, redirect } from "@remix-run/node";
import Stopwatch from "~/components/stopwatch";

const formatTime = (time) => {
  const hours = Math.floor(time / 36000);
  const minutes = Math.floor((time % 36000) / 600);
  const seconds = Math.floor((time % 600) / 10);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const loader = async ({ request, params }) => {
  const patientId = params.id;
  const patient = await getPatientById({ patientId });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const patientId = params.id;
  const data = {
    patientId,
  };
  for (let entry of formData.entries()) {
    const [key, value] = entry;
    data[key] = formatTime(value);
  }
  console.log("The data:", data);
  const procedureTimeStap = await putProcedureTimeStamps(data);

  return redirect(`/patient/${patientId}`);
};

export default function Label() {
  return (
    <div className="flex min-h-screen flex-row items-start justify-center bg-background">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
          <h1 className="my-3 text-2xl font-bold text-white">
            Label Patient Data
          </h1>
        </div>
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
          <div className="text-right"></div>
        </Form>
      </div>
    </div>
  );
}
