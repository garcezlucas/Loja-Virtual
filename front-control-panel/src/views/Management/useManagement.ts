import { useState } from "react";

export function useManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    openAdd,

    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
  };
}
