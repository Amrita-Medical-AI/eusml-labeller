import * as React from "react";
import StationStopwatch from "./StationStopwatch";
import PositionStopwatch from "./positionstopwatch";

const StationColumns = ({
  endTime,
  procedureStarted,
  runningStation,
  setRunningStation,
  runningPosition,
  setRunningPosition,
}) => {
  return (
    <div className="flex gap-4 md:min-w-full my-3">
      {/* First Column */}
      <div className="flex flex-col rounded bg-gray-200 p-4 w-full gap-y-5">
        <StationStopwatch
          endTime={endTime}
          stationName="Station 1"
          runningStation={runningStation}
          setRunningStation={setRunningStation}
          procedureStarted={procedureStarted}
        />
        <StationStopwatch
          endTime={endTime}
          stationName="Station 2"
          runningStation={runningStation}
          setRunningStation={setRunningStation}
          procedureStarted={procedureStarted}
        />
        <StationStopwatch
          endTime={endTime}
          stationName="Station 3"
          runningStation={runningStation}
          setRunningStation={setRunningStation}
          procedureStarted={procedureStarted}
        />
      </div>

      {/* Second Column */}
      <div className="flex flex-col rounded bg-gray-200 p-4 w-full gap-y-5">
        <PositionStopwatch
          endTime={endTime}
          positionName="Stomach 1"
          runningPosition={runningPosition}
          setRunningPosition={setRunningPosition}
          procedureStarted={procedureStarted}
        />

        <PositionStopwatch
          endTime={endTime}
          positionName="D 1"
          runningPosition={runningPosition}
          setRunningPosition={setRunningPosition}
          procedureStarted={procedureStarted}
        />

        <PositionStopwatch
          endTime={endTime}
          positionName="D 2"
          runningPosition={runningPosition}
          setRunningPosition={setRunningPosition}
          procedureStarted={procedureStarted}
        />
      </div>
    </div>
  );
};

export default StationColumns;
