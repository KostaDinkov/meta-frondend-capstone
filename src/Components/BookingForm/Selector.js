import React from "react";
import ErrorField from "../Elements/FormErrorField";

export default function Selector({
  options,
  value,
  handleFieldChange,
  error,
  name,
  label,
  defaultOption,
}) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        required
        aria-label={label}
        id={name}
        value={value}
        onBlur={(e) => handleFieldChange(name, e.target.value)}
        onChange={(e) => handleFieldChange(name, e.target.value)}
      >
        {defaultOption && <option>{defaultOption}</option>}
        {options.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>
      <ErrorField display={error?.status || false} message={error?.message} />
    </>
  );
}
