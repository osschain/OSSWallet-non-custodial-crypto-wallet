import CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { mockedSeed } from "@/util/mock";

type AuthData = {
  seed: string | null;
  loading: boolean;
  addSeed: (seed: string) => void;
  clearSeed: () => void;
  password: string | null;
  addPassword: (password: string) => void;
  setUpSeed: () => void;
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
  addSeed: () => {},
  clearSeed: () => {},
  password: null,
  addPassword: () => {},
  setUpSeed: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string | null>("12345678");

  useEffect(() => {
    async function getseed() {
      if (!password) return;

      await decryptAndSaveSeed(password);

      setLoading(false);
    }

    getseed();
  }, [password]);

  const addSeed = (seed: string) => {
    setSeed(seed);
  };

  const clearSeed = () => {
    setSeed(null);
  };

  const encryptSeed = async (seed: string, password: string) => {
    return CryptoES.AES.encrypt(seed, password).toString();
  };

  const decryptAndSaveSeed = async (password: string) => {
    const encryptedSeed = await SecureStore.getItem("seed");

    if (!encryptedSeed) return;

    const decrypted = CryptoES.AES.decrypt(encryptedSeed, password);
    const seed = decrypted.toString(CryptoES.enc.Utf8);

    setSeed(seed);
  };

  const saveEncryptedSeed = async (encryptedSeed: string, password: string) => {
    if (!encryptedSeed) return;
    await SecureStore.setItemAsync("seed", encryptedSeed);
  };

  const setUpSeed = async () => {
    if (!password) return;
    // todo seed create logic
    const seed = mockedSeed;
    const encryptedSeed = await encryptSeed(seed, password);

    await saveEncryptedSeed(encryptedSeed, password);
  };

  const addPassword = (password: string) => {
    setPassword(password);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        seed,
        addSeed,
        clearSeed,
        password,
        addPassword,
        setUpSeed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
