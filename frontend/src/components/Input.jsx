import React from "react";

export const Input = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="border border-gray-300 rounded px-3 py-2 w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};