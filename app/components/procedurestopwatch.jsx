import { useState, useEffect, useRef } from "react";
import { Form} from "@remix-run/react";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import PopupModal from "./popupModal";
import { formatTime } from "./utils";

export default function ProcedureStopwatch({
  onEndTimeChange,
  onProcedureStart,
}) {
  const [endTime, setEndTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
      // on procedure start
      console.log("procedure start");
      setTimer(setInterval(() => setEndTime((prevTime) => prevTime + 1), 100));
      onProcedureStart(true);
    } else {
      // on procedure end
      console.log("procedure end");
      toggleModal();
    }
  };

  const completeProcedure = () => {
    toggleModal();
    clearInterval(timer);
    setTimer(null);
    onEndTimeChange(endTime);
    onProcedureStart(false);
    hiddenSubmitButtonRef.current.click();
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="w-full">
      <PopupModal isOpen={modalOpen} onClose={toggleModal}>
        <Form method="post" onSubmit={toggleModal}>
          <label className="mx-5 mt-5 text-2xl text-teal-400">
            Confirm Stop!
          </label>
          <div className="my-4 flex flex-col gap-2 text-white">
           Do you want to end the procedure ?
          </div>
          <div className="flex flex-row justify-between px-3">
            <button
              className=" m-3 rounded-md bg-red-500 px-5 py-3 text-gray-100 hover:bg-red-600 hover:text-gray-300"
              onClick={toggleModal}
            >
              No
            </button>
            <button
              className=" m-3 rounded-md bg-teal-600 px-5 py-3 text-gray-100 hover:bg-teal-800 hover:text-gray-300"
              type="submit"
              onClick={completeProcedure}
            >
              Yes
            </button>
          </div>
        </Form>
      </PopupModal>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="mx-4 flex h-20 w-full flex-row items-center justify-center gap-4 rounded border-4 border-teal-700 bg-teal-400 p-2">
          <div className="flex h-16 w-full items-center justify-center">
            <span className="font-mono text-3xl text-white">
              {formatTime(endTime)}
            </span>
          </div>
        </div>
        <button type="button" onClick={toggleTimer} className="w-full">
          <input
            ref={hiddenSubmitButtonRef}
            type="submit"
            style={{ display: "none" }}
          />
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
        </button>
      </div>
    </div>
  );
}
