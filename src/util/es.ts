import CryptoES from "crypto-es";

export const encrypt = async (encrypted: string, password: string) => {
  return CryptoES.AES.encrypt(encrypted, password).toString();
};

export const decrypt = async (encrypted: string | null, password: string) => {
  if (!encrypted) return null;

  const decrypted = CryptoES.AES.decrypt(encrypted, password);
  return decrypted.toString(CryptoES.enc.Utf8);
};
