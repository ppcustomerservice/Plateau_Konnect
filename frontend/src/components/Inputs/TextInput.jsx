import { memo } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from "../Tooltip";

const TextInput = memo(({ input, data, field, onChange }) => {
  return (
    <>
      <label
        htmlFor={field.key}
        className="flex items-center justify-between mx-1 !text-black font-medium"
      >
        {`${field.label}${field?.required ? " *" : ""}`}
        {field.info ? (
          <Tooltip message={field.info}>
            <IoMdInformationCircleOutline className="cursor-pointer w-5 h-5 text-black" />
          </Tooltip>
        ) : null}
      </label>
      {input === "textarea" ? (
        <textarea
          id={field.key}
          name={field.key}
          required={field.required}
          value={data[field.key]}
          onChange={onChange}
          className="p-2 w-full border border-gray-300 rounded outline-none focus:border-black !text-black"
          rows="4"
          autoComplete="off"
        ></textarea>
      ) : (
        <input
          type={input}
          min={input === "number" ? 0 : ""}
          id={field.key}
          name={field.key}
          required={field.required}
          value={data[field.key]}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:border-black !text-black"
          autoComplete="off"
        />
      )}
    </>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
