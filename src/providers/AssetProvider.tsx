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

export interface WalletType {
  address: string; // The address of the account
  publicKey: string; // The public key of the account
  privateKey: string; // The private key of the account (be cautious with this)
}
export type AssetType = {
  id: string;
  icon: string;
  name: string;
  wallet: WalletType;
  symbol: string;
};

type AssetData = {
  assets: AssetType[] | null;
  addAssets: (Asset: AssetType[]) => void;
};

const AssetContext = createContext<AssetData>({
  assets: null,
  addAssets: () => {},
});

export default function AssetProvider({ children }: PropsWithChildren) {
  const [assets, setAssets] = useState<AssetType[] | null>(null);

  const { seed } = useAuth();

  useEffect(() => {
    if (!seed) return;

    const bootstrapAsync = async () => {
      const Assets = await AsyncStorage.getItem("assets");
      if (Assets) {
        setAssets(JSON.parse(Assets));
      }
    };

    bootstrapAsync();
  }, [seed]);

  const addAssets = (assets: AssetType[]) => {
    setAssets(assets);
    AsyncStorage.setItem("assets", JSON.stringify(assets));
  };

  return (
    <AssetContext.Provider value={{ assets, addAssets }}>
      {children}
    </AssetContext.Provider>
  );
}

export const useAsset = () => useContext(AssetContext);
