import "./_management.scss";
import { useManagement } from "./useManagement";
import SearchIcon from "../../assets/icons/search.svg";
import States from "./State/States";
import City from "./City/City";

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
            <span>{`${translateWord(parameter)}s`.toLocaleUpperCase()}</span>
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
              <City
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
