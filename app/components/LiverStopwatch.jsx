// FNAStopwatch.js
import { useState, useEffect } from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { formatTime } from "./utils";

export default function LiverStopwatch({
  endTime,
  procedureStarted,
}) {
  const [liverStartTime, setLiverStartTime] = useState(0);
  const [liverEndTime, setLiverEndTime] = useState(0);
  const [liverTimer, setLiverTimer] = useState(null);
  const [timePeriods, setTimePeriods] = useState([]);

  const toggleLiverTimer = () => {
    if (liverTimer) {
      clearInterval(liverTimer);
      setLiverTimer(null);
      setLiverEndTime((prevTime) => prevTime + 1);
      setTimePeriods([
        ...timePeriods,
        { start: liverStartTime, end: liverEndTime + 1 },
      ]);
    } else {
      setLiverStartTime(endTime);
      setLiverEndTime(endTime);
      setLiverTimer(
        setInterval(() => setLiverEndTime((prevTime) => prevTime + 1), 100)
      );
    }
  };

  useEffect(() => {
    return () => {
      if (liverTimer) {
        clearInterval(liverTimer);
      }
    };
  }, [liverTimer]);

  let isDisabled =
    !procedureStarted ;

return (
    <button
        type="button"
        onClick={toggleLiverTimer}
        className={`flex w-full flex-col items-center gap-2 rounded md:min-w-[min-content] my-12 ${
            isDisabled
                ? "cursor-not-allowed bg-slate-600 text-gray-300 opacity-50 drop-shadow-2xl " 
                 : "bg-slate-600 text-white shadow-lg border-2"
        }`}
        disabled={isDisabled}
    >
        <div className="flex w-full flex-row items-center p-2">
            <div className="relative flex h-16 w-full min-w-[min-content] flex-row items-center justify-center">
                {liverTimer ? (
                    <div className="absolute text-center my-auto mr-5 flex w-full flex-row px-2 md:px-4 gap-5 ">
                        <label className="text-xl md:text-2xl font-light pl-12">Liver</label>
                        <label className="text-xl md:text-2xl text-center w-full">
                            {" "}
                            {formatTime(liverEndTime)}
                        </label>
                    </div>
                ) : (
                    <label className="absolute left-0 my-auto w-full px-2 text-center text-2xl md:px-4 md:text-3xl">
                        Liver Timer
                    </label>
                )}
                <div
                    className={`absolute right-0 ml-4 h-8 w-8 rounded-full p-1 text-white ${
                        isDisabled ? `bg-gray-400` : `bg-blue-400 hover:bg-blue-500 focus:bg-blue-300`
                    }`}
                >
                    {liverTimer ? (
                        <StopIcon className="" />
                    ) : (
                        <PlayIcon className="" />
                    )}
                </div>
                {timePeriods.map((period, index) => (
                    <div key={index} className="hidden w-full">
                        <input name={`Start Liver ${index + 1}`} value={period.start} />
                        <input name={`Stop Liver ${index + 1}`} value={period.end} />
                    </div>
                ))}
            </div>
        </div>
    </button>
);
}
