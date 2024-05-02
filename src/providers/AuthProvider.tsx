import CryptoES from "crypto-es";
import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

import { mockedSeed } from "@/util/mock";

type AuthData = {
  seed: string | null;
  loading: boolean;
  seedLoading: boolean;
  encryptedSeed: string | null;
  addSeed: (seed: string) => void;
  clearSeed: () => void;
  password: string | null;
  addPassword: (password: string) => void;
  setUpSeed: () => void;
  checkPassword: (password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
  encryptedSeed: null,
  seedLoading: false,
  addSeed: () => {},
  clearSeed: () => {},
  password: null,
  addPassword: () => {},
  setUpSeed: () => {},
  checkPassword: () => Promise.resolve(false),
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [encryptedSeed, setEncryptedSeed] = useState<null | string>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [seedLoading, setSeedLoading] = useState(false);

  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    async function getseed() {
      if (!password) return;

      setSeedLoading(true);
      const seed = await decryptSeed(password);

      if (!seed) return;

      setSeed(seed);
      setSeedLoading(false);
    }

    getseed();
  }, [password]);

  useEffect(() => {
    const getEnryptedSeed = async () => {
      const encryptedSeed = await SecureStore.getItem("seed");
      setEncryptedSeed(encryptedSeed);
      setLoading(false);
    };

    getEnryptedSeed();
  }, []);

  const addSeed = (seed: string) => {
    setSeed(seed);
  };

  const clearSeed = () => {
    setSeed(null);
  };

  const encryptSeed = async (seed: string, password: string) => {
    return CryptoES.AES.encrypt(seed, password).toString();
  };

  const decryptSeed = async (password: string) => {
    const encryptedSeed = await SecureStore.getItem("seed");

    if (!encryptedSeed) return;

    try {
      const decrypted = CryptoES.AES.decrypt(encryptedSeed, password);
      return decrypted.toString(CryptoES.enc.Utf8);
    } catch {
      Alert.alert("ops..", "Password is not Correct");
    }
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

  const checkPassword = async (password: string) => {
    const seed = await decryptSeed(password);

    if (seed) {
      return true;
    } else {
      return false;
    }
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
        checkPassword,
        encryptedSeed,
        seedLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
