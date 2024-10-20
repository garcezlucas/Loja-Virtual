import "./_header.scss";
import StoreIcon from "../../../assets/icons/store-shop.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import ConfigIcon from "../../../assets/icons/configs.svg";
import UserIcon from "../../../assets/icons/user.svg";

const Header: React.FC = () => {
  return (
    <nav className="header-container">
      <div className="header-container-fix">
        <div className="header-container-left">
          <div className="header-container-left-logo">
            <img src={StoreIcon} alt="logo" />
            <span>Loja Virtual</span>
          </div>

          <div className="header-container-left-menu">
            <button>
              <img src={MenuIcon} alt="menu" />
            </button>
          </div>
        </div>
        <div className="header-container-configs">
          <button>
            <img src={CalendarIcon} alt="calendar" />
          </button>
          <button>
            <img src={ConfigIcon} alt="configuration" />
          </button>
          <button>
            <img src={UserIcon} alt="user" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
