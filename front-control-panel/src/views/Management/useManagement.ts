import { FC, useCallback, useMemo, useState } from "react";

const translationsTitle = {
  brands: "Marcas",
  categories: "Categorias",
  cities: "Cidades",
  products: "Produtos",
  states: "Estados",
  collaborators: "Colaboradores",
  clients: "Clientes",
  permissions: "Permissões",
};

const translations = {
  brands: "+ Nova marca",
  categories: "+ Nova categoria",
  cities: "+ Nova cidade",
  products: "+ Novo produto",
  states: "+ Novo estado",
  collaborators: "+ Novo colaborador",
  clients: "+ Novo cliente",
  permissions: "+ Nova Permissão",
};

interface useManagementProps {
  componentMap: Record<string, FC<any>>;
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

export function useManagement({ componentMap, parameter }: useManagementProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const translateWord = useCallback(
    (word: string | undefined, dictionary: Record<string, string>): string => {
      if (!word) return "";
      return dictionary[word.toLowerCase()] || word;
    },
    []
  );

  const TranslatedTitle = useMemo(
    () => translateWord(parameter, translationsTitle),
    [parameter, translateWord]
  );

  const TranslatedWord = useMemo(
    () => translateWord(parameter, translations),
    [parameter, translateWord]
  );

  const SelectedComponent = componentMap[parameter];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    openAdd,
    TranslatedTitle,
    TranslatedWord,
    SelectedComponent,

    handleOpenAdd,
    handleCloseAdd,
    handleSearch,
  };
}
