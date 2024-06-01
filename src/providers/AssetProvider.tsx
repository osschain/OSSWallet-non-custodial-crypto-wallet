import { Blockchain } from "@ankr.com/ankr.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthProvider";

import { getNetworks } from "@/services/asset.service";
import { OSSblockchain } from "@/services/history.service";

export interface AccountType {
  address: string;
  publicKey: string;
  privateKey: string;
}

export type AssetType = {
  icon: string;
  name: string;
  account: AccountType;
  symbol: string;
  blockchain: OSSblockchain;
};

export type NetworkType = {
  icon: string;
  label: Blockchain;
};

type AssetData = {
  assets: AssetType[] | null;
  networks: NetworkType[] | null;
  addAssets: (Asset: AssetType[]) => void;
};

const AssetContext = createContext<AssetData>({
  assets: null,
  addAssets: () => {},
  networks: null,
});

export default function AssetProvider({ children }: PropsWithChildren) {
  const [assets, setAssets] = useState<AssetType[] | null>(null);
  const [networks, setNetworks] = useState<NetworkType[] | null>(null);
  const { mnemonic } = useAuth();

  useEffect(() => {
    if (!mnemonic) return;

    const bootstrapAsync = async () => {
      const assets = await AsyncStorage.getItem("assets");
      if (assets) {
        setAssets(JSON.parse(assets));
        const networks = await getNetworks();
        setNetworks(networks);
      }
    };

    bootstrapAsync();
  }, [mnemonic]);

  const addAssets = (assets: AssetType[]) => {
    setAssets(assets);
    AsyncStorage.setItem("assets", JSON.stringify(assets));
  };

  return (
    <AssetContext.Provider value={{ assets, addAssets, networks }}>
      {children}
    </AssetContext.Provider>
  );
}

export const useAsset = () => useContext(AssetContext);
