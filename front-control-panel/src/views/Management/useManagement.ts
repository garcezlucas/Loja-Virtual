import { useState } from "react";

export function useManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const translations: { [key: string]: string } = {
    brand: "marca",
    category: "categoria",
    cities: "cidade",
    person: "pessoa",
    product: "produto",
    states: "estado"
  };
  
  function translateWord(word: string | undefined): string {
    if(!word) return '';
    return translations[word.toLowerCase()] || word;
  }

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

    translateWord,
    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
  };
}
