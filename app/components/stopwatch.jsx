import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import LiverStopwatch from "./LiverStopwatch";

export default function Stopwatch() {
  const [initialTime, setInitialTime] = useState(0);
  const [procedureStarted, setProcedureStarted] = useState(false);

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-2">
      <ProcedureStopwatch
        onEndTimeChange={setInitialTime}
        onProcedureStart={setProcedureStarted}
      />
        <LiverStopwatch
          endTime={initialTime}
          procedureStarted={procedureStarted}
        />
    </div>
  );
}
