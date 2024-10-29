'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StoreIcon from "../../../public/icons/store-shop.svg";
import MenuIcon from "../../../public/icons/menu.svg";
import UserIcon from "../../../public/icons/user.svg";
import CartIcon from "../../../public/icons/cart.svg";

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt, onClick }) => (
  <button onClick={onClick} aria-label={alt} className="p-2">
    <Image src={src} alt={alt} width={24} height={24} />
  </button>
);

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

/* interface HeaderProps {
} */

const Header: React.FC = ({  }) => {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const HEADER_CONFIG = [
    {
      icon: UserIcon,
      alt: "User",
      dropdownItems: [{ label: "Logout", onClick: () => console.log('clicou') }],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleDropdownIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-[#FAFAFA] text-gray-100 py-4 shadow-md">
      <div className="w-full flex items-center justify-between px-4">
        
        {/* Logo e Menu */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image src={StoreIcon} alt="Store Logo" width={32} height={32} />
            <span className="text-black font-semibold">Loja Virtual</span>
          </div>
          <IconButton src={MenuIcon} alt="Menu" onClick={toggleMenu} />
        </div>

        {/* Ícones de usuário e carrinho */}
        <div className="flex items-center space-x-6">
          {/* Carrinho de Compras */}
          <IconButton src={CartIcon} alt="Carrinho de Compras" />

          {/* Ícones com Dropdown */}
          {HEADER_CONFIG.map((item, index) => (
            <div key={index} className="relative" ref={dropdownRef}>
              <IconButton
                src={item.icon}
                alt={item.alt}
                onClick={() => toggleDropdown(index)}
              />
              {visibleDropdownIndex === index && (
                <Dropdown items={item.dropdownItems} />
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
