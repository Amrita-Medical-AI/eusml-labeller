import { useLoaderData } from "@remix-run/react";
import { getPatientByMRD } from '~/models/patient.server';
import { json } from "@remix-run/node";

export const loader = async ({ request, params }) => {
    const patientMRD = params.mrd 
    const patient = await getPatientByMRD({ patientMRD });
    if (!patient) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ patient });
}

export default function Label() {
    const data = useLoaderData();
    return (
        <div className="flex flex-row justify-center items-start min-h-screen bg-slate-600">
            <h1 className="text-4xl font-bold text-center text-white p-2">
                MRD
            </h1>
            <h1 className="text-4xl font-bold text-center text-teal-400 p-2">
                {data.patient.mrd}
            </h1>
            {/* display other patient data here */}
        </div>
    );
}




