// FNAStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function FNAStopwatch({ endTime, procedureStarted, runningStation }) {
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
    } else {
      setStationStartTime(endTime);
      setStationEndTime(endTime);
      setStationTimer(
        setInterval(() => setStationEndTime((prevTime) => prevTime + 1), 100)
      );
    }
  };

  useEffect(() => {
    return () => {
      if (stationTimer) {
        clearInterval(stationTimer);
      }
    };
  }, [stationTimer]);

  let isDisabled = !procedureStarted || !(runningStation !== null && runningStation !== "FNA");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center rounded bg-slate-600 p-2">
        <div className="relative mx-4 flex h-14 w-96 items-center justify-center">
          <label
            className="absolute left-0 right-0 text-center text-3xl text-white"
            style={{ alignSelf: "flex-start" }}
          >
            {stationTimer
              ? formatTime(stationEndTime)
              : `Start FNA Timer`}
          </label>
          <button
            type="button"
            onClick={toggleStationTimer}
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
                name={`Start FNA ${index + 1}`}
                value={period.start}
              />
              <input
                name={`Stop FNA ${index + 1}`}
                value={period.end}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
