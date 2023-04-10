import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function StationStopwatch({ endTime, stationName }) {
  const [stationStartTime, setStationStartTime] = useState(0);
  const [stationEndTime, setStationEndTime] = useState(0);
  const [stationTimer, setStationTimer] = useState(null);
  const [isStopped, setIsStopped] = useState(false);

  const toggleStationTimer = () => {
    if (stationTimer) {
      clearInterval(stationTimer);
      setStationTimer(null);
      setIsStopped(true);
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

return (
  <div className="flex flex-col items-center gap-2">
    <div className="flex flex-row items-center rounded bg-slate-600 p-2">
      <div className="relative flex items-center justify-center h-14 w-96 mx-4">
        <label
          className="absolute left-0 right-0 text-3xl text-white text-center"
          style={{ alignSelf: "flex-start" }}
        >
          {isStopped
            ? formatTime(stationEndTime)
            : stationTimer
            ? formatTime(stationEndTime)
            : `Start ${stationName} Timer`}
        </label>
        <button
          type="button"
          onClick={toggleStationTimer}
          className="absolute right-0 ml-2 rounded-full bg-blue-400 p-1 hover:bg-blue-500 focus:bg-blue-300"
          disabled={isStopped}
        >
          {stationTimer ? (
            <StopIcon className="h-6 w-6 text-white" />
          ) : (
            <PlayIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <input
          name={`Start ${stationName}`}
          value={stationStartTime}
          className="hidden"
        />
        <input
          name={`Stop ${stationName}`}
          value={stationEndTime}
          className="hidden"
        />
      </div>
    </div>
  </div>
);


}
