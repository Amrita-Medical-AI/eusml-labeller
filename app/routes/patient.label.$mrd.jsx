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

export default function Label(){
    const data = useLoaderData();
    return (
        <h1>Label {data.patient.name} data here</h1>
    );
}