import React from "react";
import { Form } from "@remix-run/react";

export default function PatientDataCard({ patient }) {
  const { patientId, mrd, name, date, doctor } = patient;

  const [cancerValue, setCancerValue] = React.useState("");
  const [biopsyValue, setBiopsyValue] = React.useState("");

  return (
    <div className="mx-auto max-w-lg rounded-md bg-white p-4 shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          <span className="font-bold"> Name : </span>
          <span>{name}</span>
        </h2>
        <p className="text-gray-700">
          <span className="font-bold"> Patient UUID : </span>{" "}
          <span>{patientId}</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-800">
          <span className="font-bold"> MRD : </span> <span>{mrd}</span>
        </p>
        <p className="text-gray-800">
          <span className="font-bold">Date : </span>
          <span>
            {new Date(date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
        <p className="text-gray-800">
          <span className="font-bold">Doctor : </span>
          <span>{doctor}</span>
        </p>
      </div>
      <div className=" flex space-x-5">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => navigator.clipboard.writeText(patientId)}
        >
          Copy UUID
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => navigator.clipboard.writeText(mrd)}
        >
          Copy MRD
        </button>
      </div>
      <hr className="my-4" />
      <div className="my-4 text-xl font-semibold"> Patient Report </div>
      <Form method={"post"}>
        <input type="hidden" name="intent" value={"biopsy"} />
        <input type="hidden" name="patientId" value={patientId} />
        <div className="my-2 p-2">
          <label>
            Cancer:
            <select
              className="my-1 w-full rounded border border-gray-300 p-2"
              name="cancer"
              value={cancerValue}
              onChange={(e) => setCancerValue(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="true">Yes - Cancer</option>
              <option value="false">No - Not Cancer</option>
              <option value=" ">No Data</option>
            </select>
          </label>
        </div>
        <div className="my-2 p-2">
          <div>
            Biopsy Report:
            <textarea
              className="my-1 w-full rounded border border-gray-300 p-2"
              name="biopsy"
              value={biopsyValue}
              onChange={(e) => setBiopsyValue(e.target.value)}
            />
          </div>
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
