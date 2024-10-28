import CryptoJS from "crypto-js";

const getSecretKey = () => {
  try {
    const secretKey = process.env.REACT_APP_ENCRYPTION;
    return secretKey ?? "";
  } catch (error) {
    console.error("Failed to get secret key:", error);
    throw new Error("Failed to get secret key.");
  }
};

const encryptData = (data: any, secretKey: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (cipherText: string, secretKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    throw new Error("Failed to decrypt data.");
  }
};

export const saveToLocalStorageEncrypted = async (key: string, data: any) => {
  try {
    const secretKey = getSecretKey();
    const encryptedData = encryptData(data, secretKey);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
    throw new Error("Erro ao salvar dados do localStorage");
  }
};

export const getFromLocalStorageDecrypted = async (key: string) => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    const secretKey = getSecretKey();
    return decryptData(encryptedData, secretKey);
  } catch (error) {
    console.error("Failed to get from localStorage:", error);
    throw new Error("Erro ao buscar dados do localStorage");
  }
};
