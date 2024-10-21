import "./_multiSelect.scss";
import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    if (value.toString() === "0") return;

    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  const disablesOption = options?.find(
    (option) => option.value.toString() === "0"
  );

  return (
    <div className="dynamicForm-container-form-group-multiselect">
      <div className="multiselect-header" onClick={toggleDropdown}>
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
    </div>
  );
};

export default MultiSelect;
