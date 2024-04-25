import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  masterKey: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  masterKey: null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [masterKey, setMasterKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getMasterKey() {
      const key = await SecureStore.getItemAsync("masterKey");
      if (key) {
        alert("🔐 Here's your value 🔐 \n" + key);
        setMasterKey(key);
      } else {
        console.log("No values stored under that key.");
      }
      setLoading(false);
    }
    getMasterKey();
  }, []);
  return (
    <AuthContext.Provider value={{ loading, masterKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
