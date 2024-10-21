export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .substring(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const removeCpfMask = (value: string) => {
  return value.replace(/\D/g, "");
};
