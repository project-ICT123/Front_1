import React from "react";

const Button = ({ label, onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 py-3 px-4 bg-logocolor hover:bg-pink rounded-lg bg-logocolor text-white text-sm sm:text-base flex items-center justify-center ${className}`}
    >
      {children || label}
    </button>
  );
};

export default Button;