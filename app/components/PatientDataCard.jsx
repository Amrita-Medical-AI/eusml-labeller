import React from "react";

export default function PatientDataCard({ patient }) {
  const { patientId, mrd, name, date, doctor } = patient;

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
            {new Date(date).toLocaleDateString(
              "en-IN",
              {
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

      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={
        () => navigator.clipboard.writeText(patientId)
      }>
        Copy UUID
      </button>
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={
        () => navigator.clipboard.writeText(mrd)
      }>
        Copy MRD
      </button>
      </div>
    </div>
  );
}
