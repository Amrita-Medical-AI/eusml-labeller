import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function TumorStopWatch({ endTime, procedureStarted, runningStation }) {
  const [stationStartTime, setStationStartTime] = useState(0);
  const [stationEndTime, setStationEndTime] = useState(0);
  const [stationTimer, setStationTimer] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  const toggleTimer = () => {
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

  let isDisabled = !procedureStarted || !(runningStation !== null && runningStation !== "Tumor");

  return (
    <button
    type="button"
    onClick={toggleTimer}
    className={`flex w-full flex-col items-center gap-2 rounded md:min-w-[min-content] ${
      isDisabled
        ? "cursor-not-allowed bg-slate-600 text-gray-300 opacity-50 drop-shadow-2xl"
        : "bg-slate-600 text-white shadow-lg"
    }`}
    disabled={isDisabled}
  >
    <div className="flex w-full flex-row items-center p-2">
      <div className="relative flex h-16 w-full min-w-[min-content] flex-row items-center justify-center">
        {stationTimer ? (
          <div className="absolute left-0 my-auto mr-5 flex w-full flex-col px-2 text-start md:px-4">
            <label className="text-sm font-light ">Tumor</label>
            <label className="text-lg md:text-xl">
              {" "}
              {formatTime(stationEndTime)}
            </label>
          </div>
        ) : (
          <label className="absolute left-0 my-auto w-full px-2 text-center text-lg md:px-4 md:text-xl">
            Tumor Timer
          </label>
        )}
        <div
          className={`absolute right-0 top-0 ml-4 h-8 w-8 rounded-full p-1 text-white ${
            isDisabled ? `bg-gray-400` : `bg-blue-400 hover:bg-blue-500 focus:bg-blue-300`
          }`}
        >
          {stationTimer ? (
            <StopIcon/>
          ) : (
            <PlayIcon/>
          )}
        </div>
        {timePeriods.map((period, index) => (
          <div key={index} className="hidden w-full">
            <input name={`Start Tumor ${index + 1}`} value={period.start} />
            <input name={`Stop Tumor ${index + 1}`} value={period.end} />
          </div>
        ))}
      </div>
    </div>
  </button>
  );
}
