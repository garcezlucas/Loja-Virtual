import { useState, useRef } from "react";
import { SelectField } from "./Select";

interface useSelectProps {
  field: SelectField;
  handleChange: (name: string, value: number) => void;
  required: boolean;
}

export function useSelect({ field, handleChange, required }: useSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setHasInteracted(true);
  };

  const handleOptionClick = (value: number) => {
    if (value.toString() === "0") return;

    handleChange(field.name, value);
    setIsInvalid(required && value === 0);
    setIsOpen(false);
  };

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

  const disablesOption = field.options?.find(
    (option) => option.value.toString() === "0"
  );

  return {
    isOpen,
    isInvalid,
    dropdownRef,
    hasInteracted,

    toggleDropdown,
    handleOptionClick,
    handleClickOutside,
    disablesOption,
  };
}
