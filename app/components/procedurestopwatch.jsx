// ProcedureStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function ProcedureStopwatch({ onEndTimeChange }) {
  const [endTime, setEndTime] = useState(0);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    onEndTimeChange(endTime);
  }, [endTime, onEndTimeChange]);
  

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const toggleTimer = () => {
    if (!timer) {
      setTimer(
        setInterval(() => setEndTime((prevTime) => prevTime + 1), 100)
      );
    } else {
      clearInterval(timer);
      setTimer(null);
      onEndTimeChange(endTime);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-48 flex-row items-center justify-center gap-4 rounded bg-teal-400 p-2">
        <span className="font-mono text-lg text-white">
          {formatTime(endTime)}
        </span>
      </div>
      <div className="flex flex-row items-center rounded bg-blue-500 p-2">
        <label
          className="text-3xl text-white"
          style={{ alignSelf: "flex-start" }}
        >
          {timer ? "Stop Procedure" : "Start Procedure"}
        </label>
        <button
          type="button"
          onClick={toggleTimer}
          className="ml-2 rounded-full bg-blue-400 p-1 hover:bg-blue-500 focus:bg-blue-300"
        >
          {timer ? (
            <StopIcon className="h-6 w-6 text-white" />
          ) : (
            <PlayIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <input
            name="Stop Procedure"
            value={endTime}
            className="hidden"
          />
      </div>
    </div>
  );
}
