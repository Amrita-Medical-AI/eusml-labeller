import { Form, useLoaderData, useActionData } from "@remix-run/react";
import {
  getPatientByMRD,
  putProcedureTimeStamps,
} from "~/models/patient.server";
import { json, redirect } from "@remix-run/node";
import Stopwatch from "~/components/stopwatch";

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
