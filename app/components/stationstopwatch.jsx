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
      className={`flex flex-col items-center gap-2 ${isDisabled ? 'opacity-70' : ''}`}
      disabled={isDisabled}
    >
      <div className="flex flex-row items-center rounded bg-slate-600 p-2">
        <div className="relative mx-4 flex h-14 w-96 items-center justify-center">
          <label
            className="absolute left-0 right-0 text-center text-3xl text-white"
            style={{ alignSelf: "flex-start" }}
          >
            {stationTimer
              ? formatTime(stationEndTime)
              : `Start ${stationName} Timer`}
          </label>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleStationTimer();
            }}
            className={`absolute right-0 ml-2 rounded-full p-1 ${isDisabled ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-500 focus:bg-blue-300'}`}
            disabled={isDisabled}
          >
            {stationTimer ? (
              <StopIcon className="h-6 w-6 text-white" />
            ) : (
              <PlayIcon className="h-6 w-6 text-white" />
            )}
          </button>
          {timePeriods.map((period, index) => (
            <div key={index} className="hidden">
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
