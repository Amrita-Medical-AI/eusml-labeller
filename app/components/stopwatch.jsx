// Stopwatch.js
import { useState } from "react";
import ProcedureStopwatch from "./procedurestopwatch";
import StationStopwatch from "./stationstopwatch";

export default function Stopwatch() {
  const [initialTime, setInitialTime] = useState(0);
  return (
    <div className="flex flex-col items-center gap-2">
      <ProcedureStopwatch onEndTimeChange={setInitialTime} />
      <StationStopwatch endTime={initialTime} stationName="Station 1"/>
      <StationStopwatch endTime={initialTime} stationName="Station 2"/>
      <StationStopwatch endTime={initialTime} stationName="Station 3"/>
      <StationStopwatch endTime={initialTime} stationName="FNA"/>
    </div>
  );
}
