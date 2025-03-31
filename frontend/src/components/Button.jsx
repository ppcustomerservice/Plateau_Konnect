import React from "react";

export const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyle = "px-4 py-2 rounded text-black font-bold transition";
  const variants = {
    default: " hover:bg-orange-600",
    outline: "border border-orange-500 text-black-500 hover:bg-orange-500 hover:text-white",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};