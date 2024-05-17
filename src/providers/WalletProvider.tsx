import AsyncStorage from "@react-native-async-storage/async-storage";
import { HDNodeWallet } from "ethers";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthProvider";

type WalletType = {
  id: string;
  wallet: HDNodeWallet;
};

type WalletData = {
  wallets: WalletType[] | null;
  addWallets: (wallet: WalletType[]) => void;
};

const WalletContext = createContext<WalletData>({
  wallets: null,
  addWallets: () => {},
});

export default function WalletProvider({ children }: PropsWithChildren) {
  const [wallets, setWallets] = useState<WalletType[] | null>(null);

  const { seed } = useAuth();

  useEffect(() => {
    if (!seed) return;

    const bootstrapAsync = async () => {
      const wallets = await AsyncStorage.getItem("wallets");
      if (wallets) {
        setWallets(JSON.parse(wallets));
      }
    };

    bootstrapAsync();
  }, [seed]);

  const addWallets = (wallets: WalletType[]) => {
    setWallets(wallets);
    AsyncStorage.setItem("wallets", JSON.stringify(wallets));
  };

  return (
    <WalletContext.Provider value={{ wallets, addWallets }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
