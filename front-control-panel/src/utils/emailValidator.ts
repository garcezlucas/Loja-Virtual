export const emailValidator = (value: string | number | string[]): boolean => {
  const email = Array.isArray(value) ? value.join(",") : String(value);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};
