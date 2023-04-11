import { useLoaderData, Link } from "@remix-run/react";
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
    <div className="w-full max-w-screen-md md:max-w-screen-lg mx-auto overflow-x-auto md:overflow-x-visible">
     <div className="relative min-h-screen flex flex-col items-center justify-center bg-sky-900">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
          <h1 className="p-2 text-center text-2xl font-bold text-white">
            MRD:{" "}
          </h1>
          <h1 className="p-2 text-center text-2xl font-bold text-teal-400">
            {data.patient.mrd}
          </h1>
          <h1 className="p-2 text-center text-2xl font-bold text-white">
            Name:{" "}
          </h1>
          <h1 className="p-2 text-center text-2xl font-bold text-teal-400">
            {data.patient.name}
          </h1>
        </div>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <JsonTable data={timeStamps} />
          <Link
            to="/"
            className="mt-5 mb-1 inline-block rounded bg-teal-400 px-6 py-2 text-sm text-white hover:bg-slate-700 md:text-base"
          >
            Label another patient
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
