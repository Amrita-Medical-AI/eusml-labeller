import * as React from "react";

export default function AccessRestrictedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 ">
      <div className=" w-10/12 md:w-8/12">
        <div className="mt-4 text-5xl font-semibold text-teal-500">Sorry,</div>
        <div className="mt-4 text-left text-lg text-white">
          <span className="font-semibold">Access Restricted:</span> You haven't
          been registered yet. If you're interested in using the app, please
          reach out to us via <a href="mailto:@amrita.com" className="underline ">email</a>.
        </div>
      </div>
    </div>
  );
}
