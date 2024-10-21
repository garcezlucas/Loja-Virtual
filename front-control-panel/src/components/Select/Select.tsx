import React, { useState } from "react";
import "./_select.scss";

interface Field {
  label: string;
  name: string;
  type: "text" | "select" | "multi-select";
  value: string | number | string[];
  options?: { value: number; label: string }[];
}

interface CustomSelectProps {
  field: Field;
  handleChange: (name: string, value: number) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ field, handleChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: number) => {
    handleChange(field.name, value);
    setIsOpen(false);
  };

  const disablesOption = field.options?.find(
    (option) => option.value.toString() === "0"
  );

  return (
    <div className="custom-select">
      <div className="selected-value" onClick={toggleDropdown}>
        {field.options?.find((option) => option.value.toString() === field.value)?.label ||
          disablesOption?.label}
      </div>
      {isOpen && (
        <div className="options">
          {field.options?.map((option) => (
            <div
              key={option.value}
              className={`option ${option.value === 0 ? "disabled" : ""}`}
              onClick={() => {
                if (option.value !== 0) {
                  handleOptionClick(option.value);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
