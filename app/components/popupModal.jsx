import * as React from "react";

const PopupModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-70"></div>
      <div className="z-10 rounded-lg bg-background p-4">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupModal;
