import "./_management.scss";
import { useManagement } from "./useManagement";
import SearchIcon from "../../assets/icons/search.svg";
import States from "./State/States";
import { useEffect } from "react";

interface ManagementProps {
  parameter: string | undefined;
}

const Management: React.FC<ManagementProps> = ({ parameter }) => {
  const {
    tableData,
    filteredData,
    setFilteredData,
    page,
    setPage,
    totalPages,
    setTotalPages,
    rowsPerPage,
    searchTerm,
    openAdd,
    reload,
    setReload,

    getAllStates,
    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
    filterDataIgnoringAccents,
  } = useManagement();

  useEffect(() => {
    setPage(0);
    setTotalPages(0);
    getAllStates();
  }, [parameter, reload]);

  useEffect(() => {
    if (tableData) {
      const filtered = filterDataIgnoringAccents(tableData, searchTerm);
      setFilteredData(filtered);
    }
  }, [searchTerm, tableData]);

  return (
    <div className="management-container">
      <div className="management-container-fix">
        <header className="management-container-header">
          <button onClick={handleOpenAdd}>
            <span>{`+ Novo ${parameter}`}</span>
          </button>
        </header>

        <main className="management-container-main">
          <div className="management-container-main-header">
            <span>{parameter}</span>
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
                filteredData={filteredData}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                setTotalPages={setTotalPages}
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
                reload={reload}
                setReload={setReload}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Management;
