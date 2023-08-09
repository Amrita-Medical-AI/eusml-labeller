import { Form, useLoaderData, useActionData } from "@remix-run/react";
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
  
  const procedureTimeStap = await putProcedureTimeStamps(data);
  

  return redirect(`/patient/${patientId}`);
};

export default function Label() {
  const actionData = useActionData();
  const data = useLoaderData();

  return (
    <div className="flex min-h-screen flex-row items-start justify-center bg-sky-900">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
          <h1 className="p-2 text-center text-4xl font-bold text-white">MRD</h1>
          <h1 className="p-2 text-center text-4xl font-bold text-teal-400">
            {data?.patient?.mrd}
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
          <div className="text-right">
          </div>
        </Form>
      </div>
    </div>
  );
}
