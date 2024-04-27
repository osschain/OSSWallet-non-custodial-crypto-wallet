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
};

const AuthContext = createContext<AuthData>({
  seed: null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [seed, setSeed] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
    <AuthContext.Provider value={{ loading, seed }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
