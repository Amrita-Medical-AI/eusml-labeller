import { useState, useEffect, useRef } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function ProcedureStopwatch({
  onEndTimeChange,
  onProcedureStart,
  secondaryStart,
}) {
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
      setTimer(setInterval(() => setEndTime((prevTime) => prevTime + 1), 100));
      onProcedureStart(true);
      secondaryStart();
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
      <div className="flex w-full flex-col items-center gap-4">
        <div className="mx-4 flex h-20 w-full flex-row items-center justify-center gap-4 rounded border-4 border-teal-700 bg-teal-400 p-2">
          <div className="flex h-16 w-full items-center justify-center">
            <span className="font-mono text-3xl text-white">
              {formatTime(endTime)}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-row items-center rounded bg-blue-500 p-2">
          <div className="mx-4 flex h-14 w-full items-center justify-center">
            <label className="flex-1 justify-start text-3xl text-white">
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
            <input name="Stop Procedure" value={endTime} className="hidden" />
          </div>
        </div>
      </div>
    </button>
  );
}
