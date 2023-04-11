// StationStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function StationStopwatch({ endTime, stationName, runningStation, setRunningStation, procedureStarted }) {
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
      if (stationName !== 'FNA') {
        setRunningStation(null);
      }
    } else {
      setStationStartTime(endTime);
      setStationEndTime(endTime);
      setStationTimer(
        setInterval(() => setStationEndTime((prevTime) => prevTime + 1), 100)
      );
      if (stationName !== 'FNA') {
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

  const isDisabled = (
    (!procedureStarted) ||
    (runningStation !== null && runningStation !== stationName && stationName !== 'FNA') ||
    (stationName === 'FNA' && runningStation === null)
  );

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
        <div className="relative w-full mx-4 flex h-24 items-center justify-center md:h-14 md:min-w-[min-content]">
          <label
            className="w-full absolute left-0 right-0 text-center text-4xl text-white md:text-3xl px-4"
            style={{ alignSelf: "flex-start" }}
          >
            {stationTimer
              ? formatTime(stationEndTime)
              : `Start ${stationName} Timer`}
          </label>
          {stationTimer ? (
            <StopIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-6 md:w-6" />
          ) : (
            <PlayIcon className="absolute right-0 ml-2 h-8 w-8 text-white md:h-6 md:w-6" />
          )}
          {timePeriods.map((period, index) => (
            <div key={index} className="w-full hidden">
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
