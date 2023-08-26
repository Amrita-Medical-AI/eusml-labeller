// StationStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function StationStopwatch({
  endTime,
  stationName,
  runningStation,
  setRunningStation,
  procedureStarted,
}) {
  const [stationStartTime, setStationStartTime] = useState(0);
  const [stationEndTime, setStationEndTime] = useState(0);
  const [stationTimer, setStationTimer] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  const toggleStationTimer = () => {
    if (stationTimer) {
      clearInterval(stationTimer);
      setStationTimer(null);
      setStationEndTime((prevTime) => prevTime + 1);
      setTimePeriods([
        ...timePeriods,
        { start: stationStartTime, end: stationEndTime + 1 },
      ]);
      if (stationName !== "FNA") {
        setRunningStation(null);
      }
    } else {
      setStationStartTime(endTime);
      setStationEndTime(endTime);
      setStationTimer(
        setInterval(() => setStationEndTime((prevTime) => prevTime + 1), 100)
      );
      if (stationName !== "FNA") {
        setRunningStation(stationName);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (stationTimer) {
        clearInterval(stationTimer);
      }
    };
  }, [stationTimer]);

  const isDisabled =
    !procedureStarted ||
    (runningStation !== null &&
      runningStation !== stationName &&
      stationName !== "FNA") ||
    (stationName === "FNA" && runningStation === null);

  return (
    <button
      type="button"
      onClick={toggleStationTimer}
      className={`flex w-full flex-col items-center gap-2 md:min-w-[min-content] ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={isDisabled}
    >
      <div className="flex w-full flex-row items-center rounded bg-slate-600 p-2">
        <div className="relative mx-3 flex h-24 w-full items-center justify-center md:h-14 md:min-w-[min-content] flex-row">
          {stationTimer?
          <div className="absolute left-0 w-full flex flex-col px-4 text-start my-auto text-white">
            <label className="font-light text-sm ">{stationName}</label>
            <label className="text-lg md:text-xl"> {formatTime(stationEndTime) }</label>
          </div>
          :<label
            className="absolute left-0 top-3 w-full px-4 text-center text-lg my-auto text-white md:text-xl"
            style={{ alignSelf: "flex-start" }}
          >
            {stationName}
          </label>}
          {stationTimer ? (
            <StopIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-7 md:w-7" />
          ) : (
            <PlayIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-7 md:w-7" />
          )}
          {timePeriods.map((period, index) => (
            <div key={index} className="hidden w-full">
              <input
                name={`Start ${stationName} ${index + 1}`}
                value={period.start}
              />
              <input
                name={`Stop ${stationName} ${index + 1}`}
                value={period.end}
              />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
