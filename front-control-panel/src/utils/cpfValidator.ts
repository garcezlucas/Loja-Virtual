export const cpfValidator = (value: string | number | string[]): boolean => {
  let cpf = Array.isArray(value) ? value.join(",") : String(value);
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const digits = cpf.split("").map(Number);
  const [firstNine, checkDigits] = [digits.slice(0, 9), digits.slice(9)];

  const calculateCheckDigit = (digits: number[], multiplier: number) => {
    const sum = digits.reduce((acc, digit) => acc + digit * multiplier--, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheckDigit = calculateCheckDigit(firstNine, 10);
  const secondCheckDigit = calculateCheckDigit(
    [...firstNine, firstCheckDigit],
    11
  );

  return (
    checkDigits[0] === firstCheckDigit && checkDigits[1] === secondCheckDigit
  );
};
