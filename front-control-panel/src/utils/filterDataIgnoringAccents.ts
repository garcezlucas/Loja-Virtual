export function filterDataIgnoringAccents(
  data: any[],
  searchTerm: string
): any[] {
  const removeAccents = (str: string): string => {
    return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
  };

  return data?.filter((item: any) => {
    return removeAccents(item?.name?.toLowerCase())?.includes(
      removeAccents(searchTerm?.toLowerCase())
    );
  });
}

export function filterShortDescriptionDataIgnoringAccents(
  data: any[],
  searchTerm: string
): any[] {
  const removeAccents = (str: string): string => {
    return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
  };

  return data?.filter((item: any) => {
    return removeAccents(item?.shortDescription?.toLowerCase())?.includes(
      removeAccents(searchTerm?.toLowerCase())
    );
  });
}
