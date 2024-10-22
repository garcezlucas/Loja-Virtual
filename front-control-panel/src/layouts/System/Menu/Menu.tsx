import "./_menu.scss";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../../assets/icons/home.svg";
import CollaboratorIcon from "../../../assets/icons/collaborator.svg";
import CustomerIcon from "../../../assets/icons/customers.svg";
import PermissionIcon from "../../../assets/icons/permission.svg";
import ProductIcon from "../../../assets/icons/product.svg";
import BrandIcon from "../../../assets/icons/brand.svg";
import CategoryIcon from "../../../assets/icons/category.svg";
import StateIcon from "../../../assets/icons/state.svg";
import CityIcon from "../../../assets/icons/city.svg";

const MENU_CONFIG = [
  {
    header: "Home",
    items: [{ icon: HomeIcon, label: "Dashboard", path: "/system/dashboard" }],
  },
  {
    header: "Cadastro",
    items: [
      {
        icon: CollaboratorIcon,
        label: "Colaboradores",
        path: "/system/management/collaborators",
      },
      {
        icon: CustomerIcon,
        label: "Clientes",
        path: "/system/management/clients",
      },
      {
        icon: PermissionIcon,
        label: "Permissões",
        path: "/system/management/permissions",
      },
      {
        icon: ProductIcon,
        label: "Produtos",
        path: "/system/management/products",
      },
      { icon: BrandIcon, label: "Marcas", path: "/system/management/brands" },
      {
        icon: CategoryIcon,
        label: "Categorias",
        path: "/system/management/categories",
      },
      { icon: StateIcon, label: "Estados", path: "/system/management/states" },
      { icon: CityIcon, label: "Cidades", path: "/system/management/cities" },
    ],
  },
];

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="menu-container">
      <div className="menu-container-fix">
        {MENU_CONFIG.map((section, index) => (
          <div key={index} className="menu-container-sections">
            <h2>{section.header}</h2>
            <ul>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <img src={item.icon} alt={item.label} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
