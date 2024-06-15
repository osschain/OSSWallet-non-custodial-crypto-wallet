import AsyncStorage from "@react-native-async-storage/async-storage";
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
  mnemonic: string | null;
  loading: boolean;
  encryptedMnemonic: string | null;
  setupPass: string | null;
  isImporting: boolean;
  addIsImporting: (bool: boolean) => void;
  addMnemonic: (mnemonic: string) => void;
  addSetupPass: (mnemonic: string) => void;
  clearMnemonic: () => void;
  encryptAndSaveMnemonic: (password: string) => void;
  checkPassword: (password: string) => Promise<boolean>;
  decryptAndSaveMnemonic: (password: string) => void;
  removeEncryptedMnemonic: () => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthData>({
  mnemonic: null,
  loading: true,
  encryptedMnemonic: null,
  setupPass: null,
  isImporting: false,
  addSetupPass: () => {},
  addMnemonic: () => {},
  clearMnemonic: () => {},
  encryptAndSaveMnemonic: (password: string) => {},
  decryptAndSaveMnemonic: () => {},
  checkPassword: () => Promise.resolve(false),
  removeEncryptedMnemonic: () => {},
  addIsImporting: () => {},
  logOut: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [encryptedMnemonic, setEncryptedMnemonic] = useState<null | string>(
    null
  );
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [setupPass, setSetupPass] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const encryptedMnemonic = await getEncryptedMnemonic();
      setEncryptedMnemonic(encryptedMnemonic);
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  const getEncryptedMnemonic = async () => {
    const encryptedMnemonic = await SecureStore.getItem("mnemonic");
    return encryptedMnemonic;
  };

  const removeEncryptedMnemonic = () => {
    SecureStore.deleteItemAsync("mnemonic");
    setEncryptedMnemonic(null);
  };

  const addMnemonic = (mnemonic: string) => {
    setMnemonic(mnemonic);
  };
  const addSetupPass = (pass: string) => {
    setSetupPass(mnemonic);
  };

  const addIsImporting = (bool: boolean) => {
    setIsImporting(bool);
  };
  const clearMnemonic = () => {
    setMnemonic(null);
  };

  const encryptAndSaveMnemonic = async (password: string) => {
    if (!password || !mnemonic) return;

    setSetupPass(password);
    const encryptedMnemonic = await encrypt(mnemonic, password);
    await SecureStore.setItemAsync("mnemonic", encryptedMnemonic);
  };

  const decryptAndSaveMnemonic = async (password: string) => {
    const encryptedMnemonic = await getEncryptedMnemonic();

    if (!encryptedMnemonic) return;

    const decryptedMnemonic = await decrypt(encryptedMnemonic, password);

    if (decryptedMnemonic) {
      setSetupPass(password);
      addMnemonic(decryptedMnemonic);
    }
  };

  const logOut = async () => {
    await SecureStore.deleteItemAsync("mnemonic");
    await AsyncStorage.removeItem("assets");
    setEncryptedMnemonic(null);
    setMnemonic(null);
    setSetupPass(null);
    setIsImporting(false);
    setLoading(false);
  };

  const checkPassword = async (password: string) => {
    const encryptedMnemonic = await getEncryptedMnemonic();
    const mnemonic = await decrypt(encryptedMnemonic, password);

    if (mnemonic) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        mnemonic,
        setupPass,
        isImporting,
        addSetupPass,
        addMnemonic,
        clearMnemonic,
        encryptAndSaveMnemonic,
        checkPassword,
        encryptedMnemonic,
        decryptAndSaveMnemonic,
        removeEncryptedMnemonic,
        addIsImporting,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
