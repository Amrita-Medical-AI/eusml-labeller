import React from "react";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getUser } from "~/session.server";
import { getProcedureTimeStamps } from "~/models/patient.server";
import { getPatientById } from "~/models/cipher.server";
import JsonTable from "~/components/jsontable";

export const loader = async ({ request, params }) => {
  const patientId = params.id;
  const user = await getUser(request);
  const patient = await getPatientById({ patientId, user });
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
            <div className="mx-2 my-8 md:mx-5">
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
            </div>
            <JsonTable data={timeStamps} />
            <Link
              to="/"
              className="mb-1 mt-5 inline-block rounded bg-dark-blue px-8 py-3 text-base text-white hover:bg-slate-700 md:text-lg"
            >
              Label another patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
