import CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { decrypt, encrypt } from "@/util/es";

type AuthData = {
  seed: string | null;
  loading: boolean;
  encryptedSeed: string | null;
  addSeed: (seed: string) => void;
  clearSeed: () => void;
  encryptAndSaveSeed: (password: string) => void;
  checkPassword: (password: string) => Promise<boolean>;
  decryptAndSaveSeed: (password: string) => void;
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
  encryptedSeed: null,
  addSeed: () => {},
  clearSeed: () => {},
  encryptAndSaveSeed: (password: string) => {},
  decryptAndSaveSeed: () => {},
  checkPassword: () => Promise.resolve(false),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [encryptedSeed, setEncryptedSeed] = useState<null | string>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const encryptedSeed = await getEncryptedSeed();
      setEncryptedSeed(encryptedSeed);
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  const getEncryptedSeed = async () => {
    const encryptedSeed = await SecureStore.getItem("seed");

    return encryptedSeed;
  };

  const addSeed = (seed: string) => {
    setSeed(seed);
  };

  const clearSeed = () => {
    setSeed(null);
  };

  const encryptAndSaveSeed = async (password: string) => {
    if (!password || !seed) return;

    const encryptedSeed = await encrypt(seed, password);
    await SecureStore.setItemAsync("seed", encryptedSeed);
  };

  const decryptAndSaveSeed = async (password: string) => {
    const encryptedSeed = await getEncryptedSeed();

    if (!encryptedSeed) return;

    const decryptedSeed = await decrypt(encryptedSeed, password);

    if (decryptedSeed) {
      addSeed(decryptedSeed);
    }
  };

  const checkPassword = async (password: string) => {
    const encryptedSeed = await getEncryptedSeed();

    const seed = await decrypt(encryptedSeed, password);

    if (seed) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        seed,
        addSeed,
        clearSeed,
        encryptAndSaveSeed,
        checkPassword,
        encryptedSeed,
        decryptAndSaveSeed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
