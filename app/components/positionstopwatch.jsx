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
    (runningPosition !== null && runningPosition !== positionName && positionName !== 'FNA') ||
    (positionName === 'FNA' && runningPosition === null)
  );

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
        <div className="relative w-full mx-4 flex h-24 items-center justify-center md:h-14 md:min-w-[min-content]">
          <label
            className="w-full absolute left-0 right-0 text-center text-4xl text-white md:text-3xl px-4"
            style={{ alignSelf: "flex-start" }}
          >
            {positionTimer
              ? formatTime(positionEndTime)
              : `${positionName} Timer`}
          </label>
          {positionTimer ? (
            <StopIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-6 md:w-6" />
          ) : (
            <PlayIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-6 md:w-6" />
          )}
          {timePeriods.map((period, index) => (
            <div key={index} className="w-full hidden">
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
