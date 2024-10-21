export const maskCurrency = (value: string | number): string => {
  const onlyNumbers = value.toString().replace(/\D/g, "");
  const formattedValue = (parseFloat(onlyNumbers) / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
  return formattedValue;
};

export const removeMaskCurrency = (value: string | number): number => {
  const cleanedValue = value
    .toString()
    .replace(/R\$\s?/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numericValue = parseFloat(cleanedValue);

  return numericValue;
};
