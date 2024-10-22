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
import Permissions from "./Permissions/Permissions";
import { FC, useMemo } from "react";

interface ManagementProps {
  parameter:
    | "states"
    | "cities"
    | "brands"
    | "categories"
    | "products"
    | "collaborators"
    | "clients"
    | "permissions";
}

const componentMap: Record<string, FC<any>> = {
  states: States,
  cities: Cities,
  brands: Brands,
  categories: Categories,
  products: Products,
  collaborators: Collaborators,
  clients: Consumers,
  permissions: Permissions,
};

const Management: FC<ManagementProps> = ({ parameter }) => {
  const {
    searchTerm,
    openAdd,
    TranslatedTitle,
    TranslatedWord,
    SelectedComponent,

    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
  } = useManagement({ componentMap, parameter });

  return (
    <div className="management-container">
      <div className="management-container-fix">
        <header className="management-container-header">
          <button onClick={handleOpenAdd}>
            <span>{TranslatedWord}</span>
          </button>
        </header>

        <main className="management-container-main">
          <div className="management-container-main-header">
            <span>{TranslatedTitle}</span>
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
            {SelectedComponent && (
              <SelectedComponent
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
