import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import {
  getPatientById,
  getProcedureTimeStamps,
} from "~/models/patient.server";
import JsonTable from "~/components/jsontable";

export const loader = async ({ request, params }) => {
  const patientId = params.id;
  const patient = await getPatientById({ patientId });
  const procedureTimeStamps = await getProcedureTimeStamps({ patientId });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient, procedureTimeStamps });
};

export default function Patient() {
  const data = useLoaderData();
  const timeStamps = data.procedureTimeStamps;

  return (
    <div className="mx-auto w-full  bg-sky-900">
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex w-full flex-col items-center ">
          <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
            <div className="p-2 text-center text-2xl font-bold text-teal-400">
              Procedure Complete !
            </div>
          </div>
          <div className="flex min-h-screen w-full flex-col items-start justify-start px-5">
            <div className="my-8 mx-5">
              <div className="p-2 text-xl font-semibold text-white">
                MRD:{" "}
                <span className="p-2 text-xl font-bold text-teal-400">
                  {" "}
                  {data?.patient?.mrd}
                </span>
              </div>
              <div className="p-2 text-xl font-semibold text-white">
                Name:{" "}
                <span className="p-2 text-xl font-bold text-teal-400">
                  {" "}
                  {data?.patient?.name}
                </span>
              </div>
              <div className="p-2 text-xl font-semibold text-white">
                Doctor:{" "}
                <span className="p-2 text-xl font-bold text-teal-400">
                  {" "}
                  {data?.patient?.doctor}
                </span>
              </div>
              <div className="p-2 text-xl font-semibold text-white">
                Morphology:{" "}
                <span className="p-2 text-xl font-bold text-teal-400">
                  {" "}
                  {data?.patient?.morphology?.join(", ")}
                </span>
              </div>
            </div>
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
