// Notification.js
import React, { useState, useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide the notification after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } max-w-[90%] sm:max-w-[400px] z-50`}
      style={{ animation: "fadeIn 0.5s ease-out" }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[12px] sm:text-base md:text-[16px] lg:text-[16px]">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 text-white font-bold text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
