import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { getPatientByMRD, putStation1TimeStamps } from "~/models/patient.server";
import { json, redirect } from "@remix-run/node";

export const loader = async ({ request, params }) => {
  const patientMRD = params.mrd;
  const patient = await getPatientByMRD({ patientMRD });
  if (!patient) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ patient });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const patientMRD = params.mrd;
  const station1Start = formData.get("station1Start");
  const station1Stop = formData.get("station1Stop")

  const station1TimeStps = await putStation1TimeStamps({patientMRD, station1Start, station1Stop})

  return redirect(`/patient/${patientMRD}`);
};

export default function Label() {
  const actionData = useActionData();
  const data = useLoaderData();

  return (
    <div className="flex min-h-screen flex-row items-start justify-center bg-slate-600">
      <div className="flex flex-col items-center">
        <h1 className="p-2 text-center text-4xl font-bold text-white">MRD</h1>
        <h1 className="p-2 text-center text-4xl font-bold text-teal-400">
          {data.patient.mrd}
        </h1>
        <Form
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            width: "45vh",
          }}
        >
          <label className="text-3xl text-teal-400">Station 1</label>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-teal-400">Start</label>
              <input name="station1Start" type="text" id="station1Start" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-teal-400">Stop</label>
              <input name="station1Stop" type="text" id="station1Stop" />
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
