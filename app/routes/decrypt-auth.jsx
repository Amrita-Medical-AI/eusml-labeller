import * as React from "react";
import { Link } from "@remix-run/react";

export default function AccessRestrictedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 ">
      <div className=" w-10/12 md:w-8/12">
        <div className="mt-4 text-5xl font-semibold text-teal-500">Sorry,</div>
        <div className="mt-4 text-left text-lg text-white">
          <span className="font-semibold">Access Restricted:</span> You are not
          authorized for decrypting patient data. If you think this is mistake
          then please contact us.
        </div>
        <Link
          to="/"
          className="mb-1 mt-5 inline-block rounded bg-dark-blue px-7 py-3 text-base text-white hover:bg-slate-700 md:text-lg"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}
