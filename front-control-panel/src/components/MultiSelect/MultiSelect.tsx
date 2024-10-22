import "./_multiSelect.scss";
import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
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
  const [isOpen, setIsOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (hasInteracted) {
          setIsInvalid(required && selectedValues.length === 0);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasInteracted, required, selectedValues]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasInteracted(true);
  };

  const handleOptionClick = (value: string) => {
    if (value.toString() === "0") return;

    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
    setIsInvalid(required && newSelectedValues.length === 0);
  };

  const disablesOption = options?.find(
    (option) => option.value.toString() === "0"
  );

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
