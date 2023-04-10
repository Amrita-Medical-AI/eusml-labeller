// Stopwatch.js
import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import StationStopwatch from "./stationstopwatch";

export default function Stopwatch() {
  const [initialTime, setInitialTime] = useState(0);
  const [runningStation, setRunningStation] = useState(null);

  return (
    <div className="flex flex-col items-center gap-2 mt-5">
      <ProcedureStopwatch onEndTimeChange={setInitialTime} />
      <StationStopwatch endTime={initialTime} stationName="Station 1" runningStation={runningStation} setRunningStation={setRunningStation} />
      <StationStopwatch endTime={initialTime} stationName="Station 2" runningStation={runningStation} setRunningStation={setRunningStation} />
      <StationStopwatch endTime={initialTime} stationName="Station 3" runningStation={runningStation} setRunningStation={setRunningStation} />
      <StationStopwatch endTime={initialTime} stationName="FNA" />
    </div>
  );
}
