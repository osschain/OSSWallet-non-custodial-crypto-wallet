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
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
  addSeed: () => {},
  clearSeed: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const addSeed = (seed: string) => {
    setSeed(seed);
  };

  const clearSeed = () => {
    setSeed(null);
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
    <AuthContext.Provider value={{ loading, seed, addSeed, clearSeed }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
