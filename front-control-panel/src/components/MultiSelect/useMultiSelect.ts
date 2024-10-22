import { useState, useRef } from "react";
import { OptionMultiSelect } from "./MultiSelect";

interface useMultiSelectProps {
  options: OptionMultiSelect[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  required: boolean;
}

export function useMultiSelect({
  options,
  selectedValues,
  onChange,
  required,
}: useMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

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

  return {
    isOpen,
    isInvalid,
    dropdownRef,
    hasInteracted,

    handleClickOutside,
    toggleDropdown,
    handleOptionClick,
    disablesOption,
  };
}
