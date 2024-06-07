import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import FNAStopwatch from "./FNAstopwatch";
import TumorStopWatch from "./TumorStopWatch";
import TimerGrid from "./timergrid";

export default function Stopwatch() {
  const [initialTime, setInitialTime] = useState(0);
  const [runningStation, setRunningStation] = useState(null);
  const [runningPosition, setRunningPosition] = useState(null);
  const [procedureStarted, setProcedureStarted] = useState(false);

  return (
    <div className="mt-5 flex w-full flex-col items-center gap-2">
      <ProcedureStopwatch
        onEndTimeChange={setInitialTime}
        onProcedureStart={setProcedureStarted}
        secondaryStart={() => setRunningPosition("Stomach 1")}
      />
      <TimerGrid
        endTime={initialTime}
        runningStation={runningStation}
        setRunningStation={setRunningStation}
        runningPosition={runningPosition}
        setRunningPosition={setRunningPosition}
        procedureStarted={procedureStarted}
      />
      <div className="flex min-w-full flex-row items-center gap-4">
        <FNAStopwatch
          endTime={initialTime}
          procedureStarted={procedureStarted}
          runningStation={runningStation}
        />
        <TumorStopWatch
          endTime={initialTime}
          procedureStarted={procedureStarted}
          runningStation={runningStation}
        />
      </div>
    </div>
  );
}
