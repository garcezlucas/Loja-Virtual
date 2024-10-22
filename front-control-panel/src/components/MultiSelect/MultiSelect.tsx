import "./_multiSelect.scss";

import React, { useEffect } from "react";

import { useMultiSelect } from "./useMultiSelect";

export interface OptionMultiSelect {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: OptionMultiSelect[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
  errormessage?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  required = false,
  errormessage,
}) => {
  const {
    isOpen,
    isInvalid,
    dropdownRef,
    hasInteracted,

    handleClickOutside,
    toggleDropdown,
    handleOptionClick,
    disablesOption,
  } = useMultiSelect({ options, selectedValues, onChange, required });

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasInteracted, required, selectedValues]);

  return (
    <div className="multiselect-container" ref={dropdownRef}>
      <div
        className={`multiselect-value ${isInvalid ? "invalid" : ""}`}
        onClick={toggleDropdown}
      >
        {selectedValues.length > 0
          ? options
              .filter((option) =>
                selectedValues.includes(option.value?.toString())
              )
              .map((option) => option.label)
              .join(", ")
          : disablesOption?.label}
      </div>
      {isOpen && (
        <ul className="multiselect-options">
          {options.map((option) => {
            return (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value?.toString())}
                className={`multiselect-option ${
                  selectedValues.includes(option.value?.toString())
                    ? "selected"
                    : ""
                }`}
                style={{
                  cursor:
                    option.value.toString() === "0" ? "not-allowed" : "pointer",
                  opacity: option.value.toString() === "0" ? 0.5 : 1,
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
      {isInvalid && <div className="error-message">{errormessage}</div>}
    </div>
  );
};

export default MultiSelect;
