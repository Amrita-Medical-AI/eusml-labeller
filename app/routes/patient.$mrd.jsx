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
    <div>
      <h1>Show MRD: {data.patient.mrd} Time Stamps</h1>
      <JsonTable data={timeStamps} />
    </div>
  );
}
