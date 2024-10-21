export function cepMask(cep: string): string {
  const cepMaxLength = 9;

  return cep
    .slice(0, cepMaxLength)
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function removeCEPMask(cep: string): string {
  return cep.replace(/\D/g, "").slice(0, 9);
}
