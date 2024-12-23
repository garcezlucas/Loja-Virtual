import { useState } from "react";

interface Option {
  id: number;
  name: string;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue: number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  name: string;
}

const CustomSelect = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Selecione uma opção",
  name,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(
    (option) => option.id === selectedValue
  )?.name;

  const handleSelect = (value: number) => {
    const fakeEvent = {
      target: { id: name, value: value },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    onChange(fakeEvent);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Botão para abrir o dropdown */}
      <button
        type="button"
        className="w-full px-3 py-2 border rounded text-left bg-transparent focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel || placeholder}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={String(option.id)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => handleSelect(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
