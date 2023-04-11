import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import StationStopwatch from "./stationstopwatch";
import FNAStopwatch from "./FNAstopwatch";

export default function Stopwatch() {
  const [initialTime, setInitialTime] = useState(0);
  const [runningStation, setRunningStation] = useState(null);
  const [procedureStarted, setProcedureStarted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 mt-5">
      <ProcedureStopwatch onEndTimeChange={setInitialTime} onProcedureStart={setProcedureStarted} />
      <StationStopwatch endTime={initialTime} stationName="Station 1" runningStation={runningStation} setRunningStation={setRunningStation} procedureStarted={procedureStarted} />
      <StationStopwatch endTime={initialTime} stationName="Station 2" runningStation={runningStation} setRunningStation={setRunningStation} procedureStarted={procedureStarted} />
      <StationStopwatch endTime={initialTime} stationName="Station 3" runningStation={runningStation} setRunningStation={setRunningStation} procedureStarted={procedureStarted} />
      <FNAStopwatch endTime={initialTime} procedureStarted={procedureStarted} runningStation={runningStation} />
    </div>
  );
}
