import "./_select.scss";

import React, { useEffect } from "react";

import { useSelect } from "./useSelect";

export interface SelectField {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "select" | "multi-select" | "password";
  value: string | number | string[];
  options?: { value: number; label: string }[];
  mask?: (value: string) => string;
}

interface CustomSelectProps {
  field: SelectField;
  handleChange: (name: string, value: number) => void;
  required?: boolean;
  errormessage?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  field,
  handleChange,
  required = false,
  errormessage,
}) => {
  const {
    isOpen,
    isInvalid,
    dropdownRef,
    hasInteracted,

    toggleDropdown,
    handleOptionClick,
    handleClickOutside,
    disablesOption,
  } = useSelect({
    field,
    handleChange,
    required,
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasInteracted, required, field.value]);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div
        className={`selected-value ${isInvalid ? "invalid" : ""}`}
        onClick={toggleDropdown}
      >
        {field.options?.find(
          (option) => option.value.toString() === field.value?.toString()
        )?.label || disablesOption?.label}
      </div>
      {isOpen && (
        <ul className="selected-options">
          {field.options?.map((option) => (
            <li
              key={option.value}
              className={`selected-option ${
                option.value === 0 ? "disabled" : ""
              }`}
              onClick={() => {
                if (option.value !== 0) {
                  handleOptionClick(option.value);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isInvalid && <div className="error-message">{errormessage}</div>}
    </div>
  );
};

export default CustomSelect;
