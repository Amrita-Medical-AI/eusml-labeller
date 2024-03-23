import React from 'react';

export default function PatientDataCard({ patient }) {
  const { patientId, mrd, name, morphology, date, doctor } = patient;

return (
    <div className="bg-white shadow-md rounded-md p-4 max-w-lg mx-auto">
        <div className="mb-4">
            <h2 className="text-xl font-bold"><span className="font-bold"> Name : </span><span>{name}</span></h2>
            <p className="text-gray-600"><span className="font-bold"> Patient UUID : </span> <span>{patientId}</span></p>
        </div>
        <div className="mb-4">
            <p className="text-gray-700"><span className="font-bold"> MRD : </span> <span >{mrd}</span></p>
            <p className="text-gray-700"><span className="font-bold">Morphology : </span><span >{morphology}</span></p>
            <p className="text-gray-700"><span className="font-bold">Date : </span><span>{date}</span></p>
            <p className="text-gray-700"><span className="font-bold">Doctor : </span><span>{doctor}</span></p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Copy UUID
        </button>
    </div>
);
}
