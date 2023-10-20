import React from "react";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import {
  getPatientById,
  getProcedureTimeStamps,
  updatePatientDetails,
} from "~/models/patient.server";
import JsonTable from "~/components/jsontable";
import PopupModal from "~/components/popupModal";

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
  const patient = await getPatientById({ patientId });
  const procedureTimeStamps = await getProcedureTimeStamps({ patientId });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient, procedureTimeStamps });
};

export default function Patient() {
  const data = useLoaderData();
  const [modalOpen, setModalOpen] = React.useState(false);
  const timeStamps = data.procedureTimeStamps;
  const [selectedMorphology, setSelectedMorphology] = React.useState(
    data?.patient?.morphology
  );

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const morphologyOptions = ["Normal", "CCP", "Cysts", "Others"];

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

    setSelectedMorphology(updatedOptions);
  };

  return (
    <div className="mx-auto w-full  bg-sky-900">
      <PopupModal isOpen={modalOpen} onClose={toggleModal}>
        <Form method="post" onSubmit={toggleModal}>
          <label className="mx-5 mt-5 text-2xl text-teal-400">
            Update Morphology
          </label>
          <div className="my-4 flex flex-col gap-2 text-white">
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
          <div className="flex flex-row justify-between">
            <button
              className=" m-3 rounded-md bg-red-500 px-4 py-3 text-gray-100 hover:bg-red-600 hover:text-gray-300"
              onClick={toggleModal}
            >
              Close
            </button>
            <button
              className=" m-3 rounded-md bg-teal-600 px-4 py-3 text-gray-100 hover:bg-teal-800 hover:text-gray-300"
              type="submit"
            >
              Update
            </button>
          </div>
        </Form>
      </PopupModal>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex w-full flex-col items-center ">
          <div className="flex w-full flex-row items-center justify-center bg-slate-700 p-2">
            <div className="p-2 text-center text-2xl font-bold text-teal-400">
              Procedure Complete !
            </div>
          </div>
          <div className="flex min-h-screen w-full flex-col items-start justify-start px-5">
            <div className="my-8 mx-2 md:mx-5">
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
              <button
                onClick={toggleModal}
                className="mx-2 mt-5 mb-1 inline-block rounded bg-teal-600 px-6 py-2 text-base text-white shadow-lg hover:bg-slate-700 md:text-lg"
              >
                Update Morphology
              </button>
            </div>
            <JsonTable data={timeStamps} />
            <Link
              to="/"
              className="mt-5 mb-1 inline-block rounded bg-dark-blue px-8 py-3 text-base text-white hover:bg-slate-700 md:text-lg"
            >
              Label another patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
