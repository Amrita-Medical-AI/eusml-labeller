import { useState, useEffect, useRef } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function ProcedureStopwatch({ onEndTimeChange, onProcedureStart }) {
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

  const hiddenSubmitButtonRef = useRef(null);

  const toggleTimer = () => {
    if (!timer) {
      setTimer(
        setInterval(() => setEndTime((prevTime) => prevTime + 1), 100)
      );
      onProcedureStart(true);
    } else {
      clearInterval(timer);
      setTimer(null);
      onEndTimeChange(endTime);
      onProcedureStart(false);
      hiddenSubmitButtonRef.current.click();
    }
  };

  return (
    <button type="button" onClick={toggleTimer} className="w-full">
      <input
      ref={hiddenSubmitButtonRef}
      type="submit"
      style={{ display: "none" }}
      />
      <div className="flex flex-col items-center gap-1 w-full">
        <div className="flex h-14 w-full flex-row items-center justify-center gap-4 rounded bg-teal-400 p-2 mx-4">
          <div className="flex items-center justify-center h-14 w-full">
            <span className="text-3xl font-mono text-white">
              {formatTime(endTime)}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-row items-center rounded bg-blue-500 p-2">
          <div className="flex w-full items-center justify-center h-14 mx-4">
            <label
              className="flex-1 text-3xl text-white"
              style={{ alignSelf: "flex-start" }}
            >
              {timer ? "Stop Procedure" : "Start Procedure"}
            </label>
            <div className="flex-shrink-0">
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
            </div>
            <input
              name="Stop Procedure"
              value={endTime}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </button>
  );
  
  
}
