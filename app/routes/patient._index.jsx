import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { createPatient } from "~/models/patient.server";

export const action = async ({ request }) => {
  let formData = await request.formData();
  
  let mrd = formData.get('mrd');
  let name = formData.get('name');

  if (typeof mrd !== "string" || mrd.length === 0) {
    return json({ errors: { mrd: "MRD is required" } }, { status: 400 });
  }

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  const patient = await createPatient({ mrd, name });
  return redirect('label');
};

export default function LabellerIndexPage() {
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
        <label className="text-teal-400">
          Patient MRD
        </label>
        <input
          name="mrd"
          type="text"
          id="mrd"
          className="border-b-2 border-blue-500 bg-slate-800 text-white"
        />
        <label className="text-teal-400">
          Patient Name
        </label>
        <input
          name="name"
          id="name"
          type="text"
          className="border-b-2 border-blue-500 bg-slate-800 text-white"
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-teal-400 py-2 px-4 text-white hover:bg-teal-500 focus:bg-teal-300"
          style={{
            transition: "all 0.2s ease-in-out",
            marginTop: "25%",
          }}
        >
          Start &rarr;
        </button>
      </Form>
    </div>
  );
}
