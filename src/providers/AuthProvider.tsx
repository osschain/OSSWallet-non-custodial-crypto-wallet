import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  seed: string | null;
  loading: boolean;
  addSeed: (seed: string) => void;
  clearSeed: () => void;
  password: string | null;
  addPassword: (password: string) => void;
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
  addSeed: () => {},
  clearSeed: () => {},
  password: null,
  addPassword: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string | null>(null);

  const addSeed = (seed: string) => {
    setSeed(seed);
  };

  const clearSeed = () => {
    setSeed(null);
  };

  const addPassword = (password: string) => {
    setPassword(password);
  };

  useEffect(() => {
    async function getseed() {
      const key = await SecureStore.getItemAsync("seed");
      if (key) {
        alert("🔐 Here's your value 🔐 \n" + key);
        setSeed(key);
      } else {
        console.log("No values stored under that key.");
      }
      setLoading(false);
    }
    getseed();
  }, []);
  return (
    <AuthContext.Provider
      value={{ loading, seed, addSeed, clearSeed, password, addPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
