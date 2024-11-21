import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import { getUserId, getUser } from "~/session.server";
import { createPatient } from "~/models/patient.server";

export const loader = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
};

export const action = async ({ request }) => {
  let formData = await request.formData();

  let mrd = formData.get("mrd");
  let name = formData.get("name");

  if (typeof mrd !== "string" || mrd.length === 0) {
    return json({ errors: { mrd: "MRD is required" } }, { status: 400 });
  }

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  const user = await getUser(request);
  const patient = await createPatient({ mrd, name, user });
  return redirect(`/patient/label/${patient.patientId}`);
};

export default function LabellerIndexPage() {
  const actionData = useActionData();

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
        <label className="mt-4 text-3xl text-teal-400">Patient Name</label>
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
        <label className="mt-4 text-3xl text-teal-400">Patient MRD</label>
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

        {/* Start Button */}
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-teal-400 px-5 py-4 text-lg text-white hover:bg-teal-500 focus:bg-teal-300"
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
