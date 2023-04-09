// StationStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function StationStopwatch({ endTime }) {
  const [stationEndTime, setStationEndTime] = useState(0);
  const [stationTimer, setStationTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (stationTimer) {
        clearInterval(stationTimer);
      }
    };
  }, [stationTimer]);

  const toggleStationTimer = () => {
    if (stationTimer) {
      clearInterval(stationTimer);
      setStationTimer(null);
    } else {
      setStationEndTime(endTime);
      setStationTimer(
        setInterval(() => setStationEndTime((prevTime) => prevTime + 1), 100)
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-48 flex-row items-center justify-center gap-4 rounded bg-teal-400 p-2">
        <span className="font-mono text-lg text-white">
          {formatTime(stationEndTime)}
        </span>
      </div>
      <div className="flex flex-row items-center rounded bg-blue-500 p-2">
        <label
          className="text-3xl text-white"
          style={{ alignSelf: "flex-start" }}
        >
          {stationTimer ? "Stop Station Timer" : "Start Station Timer"}
        </label>
        <button
          type="button"
          onClick={toggleStationTimer}
          className="ml-2 rounded-full bg-blue-400 p-1 hover:bg-blue-500 focus:bg-blue-300"
        >
          {stationTimer ? (
            <StopIcon className="h-6 w-6 text-white" />
          ) : (
            <PlayIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
