import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { getUserId } from "~/session.server";
import * as React from "react";
import { getPatientById } from "~/models/patient.server";
import PatientDataCard from "../components/PatientDataCard";


export const loader = async ({ request, params }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const patientId = params.id;
  if (!patientId) {
    return json({ patient: null });
  }
  const patient = await getPatientById({ patientId });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient });
};

export const action = async ({ request, params }) => {
  let formData = await request.formData();

  let patientId = formData.getAll("uuid");
  console.log(patientId[0]);
  return redirect(`/decrypt/${patientId[0]}`);
};

export default function PatientDecrypt() {
  const data = useLoaderData();

  //   const [mrd, setMrd] = React.useState("");
  const [uuid, setUuid] = React.useState(data.patient?.patientId || "");
  const [error, setError] = React.useState(false);
  const [errormessage, setErrorMessage] = React.useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
      <div>
        <h1 className="my-10 text-3xl font-bold text-white">
          Decrypt Patient Data
        </h1>
      </div>
      <Form method="post" className="flex flex-col justify-center ">
        <div className="flex flex-col md:flex-row ">
          <label className="my-3 text-2xl text-slate-300 md:mx-3 md:my-0">
            Enter UUID :{" "}
          </label>
          <input
            type="text"
            name="uuid"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            placeholder="Eg : be510c33-06c4-47b7-84aa-c637b03adf8c"
            className="rounded border border-gray-300 p-2 md:w-96"
          />
        </div>
        {error && (
          <div className="mt-4 text-red-500">
            Error decrypting data {errormessage}
          </div>
        )}
        <div className="mx-auto my-10">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </Form>

      <div className="mt-4 rounded-md border bg-slate-600">
        <PatientDataCard patient={data.patient} />
      </div>
    </div>
  );
}
