import "./_menu.scss";
import { useNavigate } from "react-router-dom";

const MENU_CONFIG = [
  {
    header: "Home",
    items: [{ label: "Dashboard", path: "/system/dashboard" }],
  },
  {
    header: "Cadastro",
    items: [
      { label: "Funcionários", path: "/system/management/collaborators" },
      { label: "Clientes", path: "/system/management/clients" },
      { label: "Produtos", path: "/system/management/products" },
      { label: "Estados", path: "/system/management/states" },
      { label: "Cidades", path: "/system/management/cities" },
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
