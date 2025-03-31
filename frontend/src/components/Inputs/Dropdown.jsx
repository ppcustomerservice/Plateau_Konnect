import { memo } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from "../Tooltip";

const Dropdown = memo(({ data, field, onChange, options }) => {
  return (
    <>
      <label
        htmlFor={field.key}
        className="flex items-center justify-between mx-1 text-black font-medium"
      >
        {`${field.label}${field?.required ? " *" : ""}`}
        {field.info ? (
          <Tooltip message={field.info}>
            <IoMdInformationCircleOutline className="cursor-pointer w-5 h-5" />
          </Tooltip>
        ) : null}
      </label>
      <select
        id={field.key}
        name={field.key}
        required={field.required}
        value={data[field.key]}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded outline-none focus:border-black text-black"
      >
        <option value="" disabled className="text-gray-500">
          Select
        </option>
        {options.map((option) => (
          <option key={option.key} value={option.value} className="text-black">
            {option.value}
          </option>
        ))}
      </select>
    </>
  );
});

Dropdown.displayName = "Dropdown";
export default Dropdown;
