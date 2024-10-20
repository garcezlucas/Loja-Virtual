import "./_menu.scss";

const Menu: React.FC = () => {
  return (
    <nav className="menu-container">
      <div className="menu-container-fix">
        <header>Menu navegação</header>
        <ul>
          <li>
            <span>Funcionários</span>
          </li>
          <li>
            <span>Clientes</span>
          </li>
          <li>
            <span>Produtos</span>
          </li>
          <li>
            <span>Estados</span>
          </li>
          <li>
            <span>Cidades</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
