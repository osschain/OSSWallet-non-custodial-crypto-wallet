import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAsset } from "./AssetProvider";

import { getBalances } from "@/services/balances.service";

type balanceType = {
  name: string;
  balanceUsd: string;
  balance: string;
};

export type AssetBalanceType = {
  balances: balanceType[] | null;
  loading: boolean;
};

const AssetBalanceContext = createContext<AssetBalanceType>({
  balances: null,
  loading: true,
});

// const request =
//   '{  "jsonrpc": "2.0",  "method": "eth_getBalance",  "params": ["0x8D97689C9818892B700e27F316cc3E41e17fBeb9", "latest"],  "id": 1 }';

export default function AssetBalanceProvider({ children }: PropsWithChildren) {
  const [balances, setBalances] = useState<balanceType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { assets } = useAsset();
  useEffect(() => {
    if (!assets) return;
    const bootstrapAsync = async () => {
      try {
        const balance = await getBalances(assets);
        setBalances(balance);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, [assets]);

  //   const { sendMessage } = useWebSocket(ethUrl, {
  //     onOpen: () => {
  //       console.log("OPENED");
  //       sendMessage(request);
  //     },
  //     onMessage: (message) => {
  //       console.log(message);
  //     },
  //   });

  return (
    <AssetBalanceContext.Provider value={{ balances, loading }}>
      {children}
    </AssetBalanceContext.Provider>
  );
}

export const useAssetBalance = () => useContext(AssetBalanceContext);
