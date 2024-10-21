import "./_management.scss";
import { useManagement } from "./useManagement";
import SearchIcon from "../../assets/icons/search.svg";
import States from "./States/States";
import Cities from "./Cities/Cities";
import Brands from "./Brands/Brands";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import Collaborators from "./Collaborators/Collaborators";
import Consumers from "./Consumers/Consumers";

interface ManagementProps {
  parameter: string | undefined;
}

const Management: React.FC<ManagementProps> = ({ parameter }) => {
  const {
    searchTerm,
    openAdd,

    translateWord,
    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
  } = useManagement();

  return (
    <div className="management-container">
      <div className="management-container-fix">
        <header className="management-container-header">
          <button onClick={handleOpenAdd}>
            <span>{`+ Novo ${translateWord(parameter)}`}</span>
          </button>
        </header>

        <main className="management-container-main">
          <div className="management-container-main-header">
            <span>{`${translateWord(parameter)}s`?.toLocaleUpperCase()}</span>
            <div className="management-container-main-header-search">
              <img src={SearchIcon} alt="search" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="management-container-main-table">
            {parameter === "states" && (
              <States
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "cities" && (
              <Cities
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "brands" && (
              <Brands
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "categories" && (
              <Categories
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "products" && (
              <Products
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "collaborators" && (
              <Collaborators
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
            {parameter === "clients" && (
              <Consumers
                searchTerm={searchTerm}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Management;
