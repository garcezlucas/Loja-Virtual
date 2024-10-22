import React, { useState, useEffect, useRef } from "react";
import "./_select.scss";

interface Field {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "select" | "multi-select";
  value: string | number | string[];
  options?: { value: number; label: string }[];
  mask?: (value: string) => string;
}

interface CustomSelectProps {
  field: Field;
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
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
          if (typeof field.value === "string") {
            setIsInvalid(required && field.value.length === 0);
          } else {
            setIsInvalid(required && field.value === 0);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasInteracted, required, field.value]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setHasInteracted(true);
  };

  const handleOptionClick = (value: number) => {
    if (value.toString() === "0") return;

    handleChange(field.name, value);
    setIsInvalid(required && value === 0);
  };

  const disablesOption = field.options?.find(
    (option) => option.value.toString() === "0"
  );

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
