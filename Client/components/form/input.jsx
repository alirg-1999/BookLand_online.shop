import React from "react";

export const FormInput = ({ label, type, placeholder, event, name, value }) => {
  return (
    <div className="w-full h-full flex flex-col gap-1">
      {label ? (
        <label className="text-gray-600 text-sm px-2">{label}</label>
      ) : null}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={event}
        className="w-full shadow-md rounded-md py-3 font-light px-4"
        value={value}
      />
    </div>
  );
};
