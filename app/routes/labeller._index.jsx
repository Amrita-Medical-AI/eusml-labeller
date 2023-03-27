import { Form } from "@remix-run/react";

export default function LabellerIndexPage(){

    return (
        <div className="bg-slate-800 min-h-screen flex justify-center items-center">
          <Form
            method="post"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: "45vh",
            }}
          >
            <label htmlFor="mrd-input" className="text-teal-400">
              Patient MRD
            </label>
            <input
              id="mrd-input"
              type="text"
              className="bg-slate-800 border-b-2 border-blue-500 text-white"
              required
            />
            <label htmlFor="name-input" className="text-teal-400">
              Patient Name
            </label>
            <input
              id="name-input"
              type="text"
              className="bg-slate-800 border-b-2 border-blue-500 text-white"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-teal-400 py-2 px-4 text-white hover:bg-teal-500 focus:bg-teal-300 flex items-center justify-center"
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