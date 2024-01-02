import * as React from "react";

const OfflineModal = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIsOnline(window.navigator.onLine);
    }, 250);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="bg-yellow-600 p-3 text-white">
      <div className="text-center">
        <div className="text-base font-bold">
          <span className="text-lg">You're offline</span> - Please check your
          internet connection!
        </div>
      </div>
    </div>
  );
};

export default OfflineModal;
