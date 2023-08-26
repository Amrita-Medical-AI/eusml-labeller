// PositionStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function PositionStopwatch({ endTime, positionName, runningPosition, setRunningPosition, procedureStarted }) {
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
      if (positionName !== 'FNA') {
        setRunningPosition(null);
      }
    } else {
      setPositionStartTime(endTime);
      setPositionEndTime(endTime);
      setPositionTimer(
        setInterval(() => setPositionEndTime((prevTime) => prevTime + 1), 100)
      );
      if (positionName !== 'FNA') {
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

  const isDisabled = (
    (!procedureStarted) ||
    (runningPosition !== null && runningPosition !== positionName));

  return (
    <button
      type="button"
      onClick={togglePositionTimer}
      className={`flex w-full flex-col items-center gap-2 md:min-w-[min-content] ${
        isDisabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={isDisabled}
    >
      <div className="flex w-full flex-row items-center rounded bg-slate-600 p-2">
        <div className="relative mx-3 flex h-24 w-full items-center justify-center md:h-14 md:min-w-[min-content] flex-row">
          {positionTimer?
          <div className="absolute left-0 w-full px-4 text-start my-auto text-white flex flex-col">
            <label className="font-light text-sm ">{positionName}</label>
            <label className="text-lg md:text-xl"> {formatTime(positionEndTime) }</label>
          </div>
          :<label
            className="absolute left-0 top-3 w-full px-4 text-center text-lg my-auto text-white md:text-xl"
            style={{ alignSelf: "flex-start" }}
          >
            {positionName}
          </label>}
          {positionTimer ? (
            <StopIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-7 md:w-7" />
          ) : (
            <PlayIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-7 md:w-7" />
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
