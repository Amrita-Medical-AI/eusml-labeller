import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createPatient } from "~/models/patient.server";

export const action = async ({ request }) => {
  let formData = await request.formData();

  let mrd = formData.get("mrd");
  let name = formData.get("name");
  let morphology = formData.getAll("morphology");
  let doctor = formData.get("doctor");

  if (typeof mrd !== "string" || mrd.length === 0) {
    return json({ errors: { mrd: "MRD is required" } }, { status: 400 });
  }

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  if (
    typeof doctor !== "string" ||
    doctor.length === 0 ||
    doctor.trim() === ""
  ) {
    return json(
      { errors: { doctor: "Doctor is not selected" } },
      { status: 400 }
    );
  }

  if (morphology.length === 0) {
    return json(
      { errors: { morphology: "Morphology is not selected" } },
      { status: 400 }
    );
  }

  const patient = await createPatient({ mrd, name, morphology, doctor });
  return redirect(`/patient/label/${patient.patientId}`);
};

export default function LabellerIndexPage() {
  const actionData = useActionData();

  const [selectedMorphology, setSelectedMorphology] = React.useState([]);
  const [selectedDoctor, setSelectedDoctor] = React.useState("");

  const morphologyOptions = ["Normal", "CCP", "Cysts", "Others"];
  const doctorsOptions = ["Dr. Priya", "Dr. Anoop", "Dr. Sharon"];

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
    <div className="flex min-h-screen items-center justify-center bg-slate-800">
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "45vh",
        }}
      >
        {/* Name */}
        <label className="mt-5 text-3xl text-teal-400">Patient Name</label>
        <input
          name="name"
          id="name"
          type="text"
          className="border-0 border-b-2 border-blue-500 bg-slate-800 px-3 text-4xl text-white"
          aria-invalid={actionData?.errors?.name ? true : undefined}
          aria-errormessage={
            actionData?.errors?.name ? "name-error" : undefined
          }
        />
        {actionData?.errors?.name && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.name}
          </div>
        )}

        {/* MRD */}
        <label className="mt-5 text-3xl text-teal-400">Patient MRD</label>
        <input
          name="mrd"
          type="number"
          id="mrd"
          className="border-0 border-b-2 border-blue-500 bg-slate-800 px-3 text-4xl text-white"
          aria-invalid={actionData?.errors?.mrd ? true : undefined}
          aria-errormessage={actionData?.errors?.mrd ? "mrd-error" : undefined}
        />
        {actionData?.errors?.mrd && (
          <div className="pt-1 text-red-700" id="mrd-error">
            {actionData.errors.mrd}
          </div>
        )}

        {/* Morphology */}
        <label className="mt-5 text-3xl text-teal-400">Morphology</label>
        <div className="flex flex-col gap-2 text-white">
          {morphologyOptions.map((option) => (
            <label key={option} className="mx-3 flex items-center gap-3">
              <input
                type="checkbox"
                name="morphology"
                value={option}
                checked={selectedMorphology.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className=" rounded-md border-teal-500 bg-teal-50 p-4 text-2xl font-medium text-teal-700 focus:ring-teal-200"
                aria-invalid={actionData?.errors?.morphology ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.morphology
                    ? "morphology-error"
                    : undefined
                }
              />
              {option}
            </label>
          ))}
        </div>
        {actionData?.errors?.morphology && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.morphology}
          </div>
        )}

        {/* Doctor */}
        <label className="mt-5 text-3xl text-teal-400">Doctor</label>
        <select
          name="doctor"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="mx-3 rounded-md bg-offwhite px-4 py-3 text-xl text-white"
          aria-invalid={actionData?.errors?.doctor ? true : undefined}
          aria-errormessage={
            actionData?.errors?.doctor ? "doctor-error" : undefined
          }
        >
          <option value="" disabled>
            Select Doctor
          </option>
          {doctorsOptions.map((doctor) => (
            <option key={doctor} value={doctor} className="py-5">
              {doctor}
            </option>
          ))}
        </select>
        {actionData?.errors?.doctor && (
          <div className="pt-1 text-red-700" id="name-error">
            {actionData.errors.doctor}
          </div>
        )}

        {/* Start Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-teal-400 py-4 px-5 text-lg text-white hover:bg-teal-500 focus:bg-teal-300"
          style={{
            transition: "all 0.2s ease-in-out",
            marginTop: "20%",
          }}
        >
          Start &rarr;
        </button>
      </Form>
    </div>
  );
}
