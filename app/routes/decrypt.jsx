import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getUserId } from "~/session.server";
import * as React from "react";

export const loader = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) return redirect("/login");
    return json({});
  };

export default function PatientDecryptPage() {
  const actionData = useActionData();
  const [mrd, setMrd] = React.useState("");
  const [uuid, setUuid] = React.useState("");
  const [decryptedData, setDecryptedData] = React.useState("");
  const [decrypted, setDecrypted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errormessage, setErrorMessage] = React.useState("");

  const handleDecrypt = async (e) => {
    e.preventDefault();
    // try {
    //     const response = await fetch("/api/decrypt", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ password }),
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //         setDecryptedData(data.decryptedData);
    //         setDecrypted(true);
    //         setError(false);
    //     } else {
    //         setError(true);
    //     }
    // } catch (error) {
    //     setError(true);
    // }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
      <div>
        <h1 className="my-10 text-3xl font-bold text-white">
          Decrypt Patient Data
        </h1>
      </div>
      <Form onSubmit={handleDecrypt}>
        <div className="flex flex-col md:flex-row items-center gap-4 md:space-x-16">
          <div className="flex flex-col">
            <label className="text-2xl text-slate-300">Enter MRD</label>
            <input
              type="mrd"
              name="mrd"
              value={mrd}
              onChange={(e) => setMrd(e.target.value)}
              placeholder="Eg : 234235"
              className="rounded border border-gray-300 p-2 md:w-96"
            />
          </div>
          <div className="text-2xl text-slate-300">OR</div>
          <div className="flex flex-col ">
            <label className="text-2xl text-slate-300">Enter UUID</label>
            <input
              type="password"
              name="password"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              placeholder="Eg : be510c33-06c4-47b7-84aa-c637b03adf8c"
              className="rounded border border-gray-300 p-2 md:w-96"
            />
          </div>
        </div>
      </Form>
      {error && (
        <div className="mt-4 text-red-500">
          Error decrypting data {errormessage}
        </div>
      )}
      <div className="my-10">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
    </button>
</div>
      {decrypted ? (
        <div className="mt-4 rounded-md border bg-slate-600">
          <pre>{decryptedData}</pre>
        </div>
      ) : (
        <div className="h-72 w-80 ">
         
        </div>
      )}
    </div>
  );
}
