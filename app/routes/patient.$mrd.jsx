import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import {
  getPatientByMRD,
  getProcedureTimeStamps,
} from "~/models/patient.server";
import JsonTable from "~/components/jsontable";

export const loader = async ({ request, params }) => {
  const patientMRD = params.mrd;
  const patient = await getPatientByMRD({ patientMRD });
  const procedureTimeStamps = await getProcedureTimeStamps({ patientMRD });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient, procedureTimeStamps });
};
export default function Patient() {
  const data = useLoaderData();
  const timeStamps = data.procedureTimeStamps;
  return (
    <div className="flex min-h-screen flex-row items-start justify-center bg-sky-900">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
        <h1 className="p-2 text-center text-4xl font-bold text-white">MRD: </h1>
          <h1 className="p-2 text-center text-4xl font-bold text-teal-400">
            {data.patient.mrd}
          </h1>
          <h1 className="p-2 text-center text-4xl font-bold text-white">Name: </h1>
          <h1 className="p-2 text-center text-4xl font-bold text-teal-400">
            {data.patient.name}
        </h1>
      </div>
      <JsonTable data={timeStamps} />
      </div>
    </div>
  );
}
