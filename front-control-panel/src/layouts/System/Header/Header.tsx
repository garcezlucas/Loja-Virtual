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

const HEADER_CONFIG = [
  {
    icon: CalendarIcon,
    alt: "Calendar",
    onClick: () => console.log("Calendar clicked"),
  },
  {
    icon: ConfigIcon,
    alt: "Configuration",
    onClick: () => console.log("Configuration clicked"),
  },
  {
    icon: UserIcon,
    alt: "User",
    onClick: () => console.log("User clicked"),
  },
];

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
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
            <IconButton
              key={index}
              src={item.icon}
              alt={item.alt}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
