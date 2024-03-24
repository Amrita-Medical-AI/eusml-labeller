import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getUserId } from "~/session.server";
import * as React from "react";
import { getPatientById, getPatientByMrd } from "~/models/cipher.server";
import PatientDataCard from "../components/PatientDataCard";

export const loader = async ({ request, params }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
};

export const action = async ({ request, params }) => {
  let formData = await request.formData();

  let patientId = formData.getAll("uuid")[0];
  let mrd = formData.getAll("mrd")[0];

  const errors = {};

  if (!patientId && !mrd) {
    errors.message = "Enter either UUID or MRD";
    return json({ errors });
  }

  let patient = null;
  if (patientId) {
    patient = await getPatientById({ patientId });
    if (!patient) {
      errors.message = "Patient not found";
    }
  } else {
    // const mrdInt = parseInt(mrd);
    patient = await getPatientByMrd({ mrd });
    if (!patient) {
      errors.message = "Patient not found";
    }
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  return json({ patient });
};

export default function PatientDecryptPage() {
  const data = useActionData();

  const [uuid, setUuid] = React.useState("");
  const [mrd, setMrd] = React.useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
      <div>
        <h1 className="my-10 text-3xl font-bold text-white">
          Decrypt Patient Data
        </h1>
      </div>
      <Form method="post" className="flex flex-col justify-center ">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center md:flex-row">
            <label className="my-3 text-2xl text-slate-300 md:mx-3 md:my-0">
              Enter UUID:{" "}
            </label>
            <input
              type="text"
              name="uuid"
              value={uuid}
              disabled={mrd ? true : false}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Eg : be510c33-06c4-47b7-84aa-c637b03adf8c"
              className="rounded border border-gray-300 p-2 md:w-96"
            />
          </div>
          <div className="mx-auto mb-2 mt-4 text-xl text-slate-50 md:my-4">
            OR
          </div>
          <div className="flex flex-col md:flex-row ">
            <label className="my-3 text-2xl text-slate-300 md:mx-3 md:my-0">
              Enter MRD :{" "}
            </label>
            <input
              type="text"
              name="mrd"
              disabled={uuid ? true : false}
              value={mrd}
              onChange={(e) => setMrd(e.target.value)}
              placeholder="Eg : 34235"
              className="rounded border border-gray-300 p-2 md:w-96"
            />
          </div>
        </div>

        <div className="mx-auto my-10">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
        </div>
      </Form>
      {
        <div>
          {data?.errors?.message && (
            <div>
              <div className="text-red-500">{data.errors.message}</div>
            </div>
          )}
          {data?.patient ? (
            <PatientDataCard patient={data.patient} />
          ) : (
            <div></div>
          )}
        </div>
      }
    </div>
  );
}
