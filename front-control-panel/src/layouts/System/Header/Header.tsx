import React, { useEffect, useRef, useState } from "react";
import "./_header.scss";
import StoreIcon from "../../../assets/icons/store-shop.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import ConfigIcon from "../../../assets/icons/configs.svg";
import UserIcon from "../../../assets/icons/user.svg";

interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ src, alt, onClick }) => (
  <button onClick={onClick} aria-label={alt}>
    <img src={src} alt={alt} />
  </button>
);

interface DropdownItem {
  label: string;
  onClick: () => void;
}

const Dropdown: React.FC<{ items: DropdownItem[] }> = ({ items }) => (
  <ul className="dropdown">
    {items.map((item, index) => (
      <li key={index} onClick={item.onClick}>
        {item.label}
      </li>
    ))}
  </ul>
);

interface HeaderProps {
  toggleMenu: () => void;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, logout }) => {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<
    number | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const HEADER_CONFIG = [
    {
      icon: CalendarIcon,
      alt: "Calendar",
      dropdownItems: [
        { label: "Event 1", onClick: () => console.log("Event 1 clicked") },
        { label: "Event 2", onClick: () => console.log("Event 2 clicked") },
        { label: "Event 3", onClick: () => console.log("Event 3 clicked") },
      ],
    },
    {
      icon: ConfigIcon,
      alt: "Configuration",
      dropdownItems: [
        { label: "Config 1", onClick: () => console.log("Config 1 clicked") },
        { label: "Config 2", onClick: () => console.log("Config 2 clicked") },
        { label: "Config 3", onClick: () => console.log("Config 3 clicked") },
      ],
    },
    {
      icon: UserIcon,
      alt: "User",
      dropdownItems: [
        { label: "Perfil", onClick: () => console.log("Perfil clicked") },
        {
          label: "Configurações",
          onClick: () => console.log("Configurações clicked"),
        },
        { label: "Logout", onClick: () => logout() },
      ],
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

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (index: number) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  return (
    <header className="header-container">
      <div className="header-container-fix">
        <div className="header-container-left">
          <div className="header-container-left-logo">
            <img src={StoreIcon} alt="Store Logo" />
            <span>Loja Virtual</span>
          </div>

          <div className="header-container-left-menu">
            <IconButton src={MenuIcon} alt="Menu" onClick={toggleMenu} />
          </div>
        </div>
        <div className="header-container-configs">
          {HEADER_CONFIG.map((item, index) => (
            <div
              className="header-container-configs-dropdown-container"
              key={index}
              ref={dropdownRef}
            >
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
