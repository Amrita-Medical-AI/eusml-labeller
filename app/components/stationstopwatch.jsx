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
      className={`flex w-full flex-col items-center gap-2 rounded md:min-w-[min-content] ${
        isDisabled
          ? "cursor-not-allowed bg-slate-600/50 text-gray-300 drop-shadow-2xl"
          : "bg-slate-600 text-white shadow-lg"
      }`}
      disabled={isDisabled}
    >
      <div className="flex w-full flex-row items-center p-2">
        <div className="relative flex h-16 w-full min-w-[min-content] flex-row items-center justify-center">
          {stationTimer ? (
            <div className="absolute left-0 my-auto mr-5 flex w-full flex-col px-2 text-start md:px-4">
              <label className="text-sm font-light ">{stationName}</label>
              <label className="text-lg md:text-xl">
                {" "}
                {formatTime(stationEndTime)}
              </label>
            </div>
          ) : (
            <label className="absolute left-0 my-auto w-full px-2 text-center text-lg md:px-4 md:text-xl">
              {stationName}
            </label>
          )}
          {stationTimer ? (
            <StopIcon className="absolute top-0 right-0 ml-3 h-7 w-7" />
          ) : (
            <PlayIcon className="absolute top-0 right-0 ml-3 h-7 w-7" />
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
