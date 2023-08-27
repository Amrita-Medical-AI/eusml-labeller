import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import StationStopwatch from "./stationstopwatch";
import FNAStopwatch from "./FNAstopwatch";
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
        secondaryStart={()=>setRunningPosition('Stomach 1')}
      />
      <TimerGrid
        endTime={initialTime}
        runningStation={runningStation}
        setRunningStation={setRunningStation}
        runningPosition={runningPosition}
        setRunningPosition={setRunningPosition}
        procedureStarted={procedureStarted}
      />
      <FNAStopwatch
        endTime={initialTime}
        procedureStarted={procedureStarted}
        runningStation={runningStation}
      />
    </div>
  );
}
