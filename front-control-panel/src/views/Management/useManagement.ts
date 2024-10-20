import { useState } from "react";
import { StateService } from "../../service/State.service";

export function useManagement() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const rowsPerPage = 4;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const getAllStates = async () => {
    try {
      const response = await StateService.getAllStates();
      setTableData(response);
    } catch (error) {
      console.error(`error when searching all states : ${error}`);
    }
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterDataIgnoringAccents = (
    data: any[],
    searchTerm: string
  ): any[] => {
    const removeAccents = (str: string): string => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return data?.filter((item: any) => {
      return removeAccents(item.name.toLowerCase()).includes(
        removeAccents(searchTerm.toLowerCase())
      );
    });
  };

  return {
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
  };
}
