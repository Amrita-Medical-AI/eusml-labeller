import React from "react";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { getUser } from "~/session.server";
import {
  getProcedureTimeStamps,
  updatePatientDetails,
} from "~/models/patient.server";
import { getPatientById } from "~/models/cipher.server";
import JsonTable from "~/components/jsontable";

export const action = async ({ request, params }) => {
  let formData = await request.formData();
  const patientId = params.id;

  let morphology = formData.getAll("morphology");
  if (morphology.length === 0) {
    return json(
      { errors: { morphology: "Morphology is not selected" } },
      { status: 400 }
    );
  }
  const updatedData = {
    morphology: morphology,
  };
  const newData = await updatePatientDetails({
    patientId: patientId,
    updatedData: updatedData,
  });

  return redirect(`/patient/${patientId}`);
};

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
  const [showSaveMorphology, setShowSaveMorphology] = React.useState(false);
  const timeStamps = data.procedureTimeStamps;
  const [selectedMorphology, setSelectedMorphology] = React.useState(
    data?.procedureTimeStamps?.morphology
  );

  const saveMorphology = () => {
    setShowSaveMorphology(false);
  };

  const morphologyOptions = ["Normal", "CCP", "Cysts", "Mass", "Others"];

  const handleCheckboxChange = (option) => {
    let updatedOptions = [];

    if (option === "Normal") {
      updatedOptions = [option];
    } else if (selectedMorphology.includes("Normal")) {
      updatedOptions = [option];
    } else {
      updatedOptions = selectedMorphology.includes(option)
        ? selectedMorphology.filter((selected) => selected !== option)
        : [...selectedMorphology, option];
    }
    setShowSaveMorphology(true);
    setSelectedMorphology(updatedOptions);
  };

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
              <div className="my-3">
                <label className="mx-2 mt-5 text-xl font-semibold text-white">
                  Update Morphology
                </label>
                  <Form method="post" onSubmit={saveMorphology}>
                <div className="mx-5 my-4 flex flex-col gap-2 text-white">
                  {morphologyOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="morphology"
                        value={option}
                        checked={selectedMorphology.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className=" rounded-md border-teal-500 bg-teal-50 p-4 text-2xl font-medium text-teal-700 focus:ring-teal-200"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {showSaveMorphology && (
                    <button
                    type="submit"
                      className="mx-5 mb-1 mt-2 inline-block rounded bg-teal-600 px-6 py-2 text-base text-white shadow-lg hover:bg-slate-700 md:text-lg transition duration-150 ease-in-out"
                    >
                      Save Morphology
                    </button>
                )}
                </Form>
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
