// PositionStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function PositionStopwatch({
  endTime,
  positionName,
  runningPosition,
  setRunningPosition,
  procedureStarted,
}) {
  const [positionStartTime, setPositionStartTime] = useState(0);
  const [positionEndTime, setPositionEndTime] = useState(0);
  const [positionTimer, setPositionTimer] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  const togglePositionTimer = () => {
    if (positionTimer) {
      clearInterval(positionTimer);
      setPositionTimer(null);
      setPositionEndTime((prevTime) => prevTime + 1);
      setTimePeriods([
        ...timePeriods,
        { start: positionStartTime, end: positionEndTime + 1 },
      ]);
      if (positionName !== "FNA") {
        setRunningPosition(null);
      }
    } else {
      setPositionStartTime(endTime);
      setPositionEndTime(endTime);
      setPositionTimer(
        setInterval(() => setPositionEndTime((prevTime) => prevTime + 1), 100)
      );
      if (positionName !== "FNA") {
        setRunningPosition(positionName);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (positionTimer) {
        clearInterval(positionTimer);
      }
    };
  }, [positionTimer]);

  const isDisabled =
    !procedureStarted ||
    (runningPosition !== null && runningPosition !== positionName);

  return (
    <button
      type="button"
      onClick={togglePositionTimer}
      className={`flex w-full flex-col items-center gap-2 rounded md:min-w-[min-content] ${
        isDisabled
          ? "cursor-not-allowed bg-slate-600/50 text-gray-300 drop-shadow-2xl"
          : "bg-slate-600 text-white shadow-lg"
      }`}
      disabled={isDisabled}
    >
      <div className="flex w-full flex-row items-center p-2">
        <div className="relative flex h-16 w-full min-w-[min-content] flex-row items-center justify-center">
          {positionTimer ? (
            <div className="absolute left-0 my-auto mr-5 flex w-full flex-col px-2 text-start md:px-4">
              <label className="text-sm font-light ">{positionName}</label>
              <label className="text-lg md:text-xl">
                {" "}
                {formatTime(positionEndTime)}
              </label>
            </div>
          ) : (
            <label className="absolute left-0 my-auto w-full px-2 text-center text-lg md:px-4 md:text-xl">
              {positionName}
            </label>
          )}
          {positionTimer ? (
            <StopIcon className="absolute top-0 right-0 ml-3 h-7 w-7" />
          ) : (
            <PlayIcon className="absolute top-0 right-0 ml-3 h-7 w-7" />
          )}
          {timePeriods.map((period, index) => (
            <div key={index} className="hidden w-full">
              <input
                name={`Start ${positionName} ${index + 1}`}
                value={period.start}
              />
              <input
                name={`Stop ${positionName} ${index + 1}`}
                value={period.end}
              />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
