interface DropdownItem {
    label: string;
    onClick: () => void;
  }
  
  const Dropdown: React.FC<{ items: DropdownItem[] }> = ({ items }) => (
    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 text-gray-700">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={item.onClick}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
  
  export default Dropdown;
  