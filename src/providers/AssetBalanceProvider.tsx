import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAssets } from "@/app/api/assets";
import { BalancesType, getBalances } from "@/services/balances.service";

export type AssetBalanceType = {
  balances: BalancesType[] | null;
  loading: boolean;
};

const AssetBalanceContext = createContext<AssetBalanceType>({
  balances: null,
  loading: true,
});

export default function AssetBalanceProvider({ children }: PropsWithChildren) {
  const [balances, setBalances] = useState<BalancesType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: assets } = useAssets();

  useEffect(() => {
    if (!assets) return;
    const bootstrapAsync = async () => {
      try {
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    bootstrapAsync();
  }, [assets]);

  // const wsRequest = (name: AssetNames) => {
  //   if (!assets) return;
  //   console.log("request");

  //   const adresses = getAdresses(assets);

  //   const adress = adresses.find((adress) => adress.name === name)?.address;

  //   const request = `{  "jsonrpc": "2.0",  "method": "eth_getBalance",  "params": [${adress}, "latest"],  "id": 1 }`;
  //   return request;
  // };

  // const { sendMessage } = useWebSocket(ethWsEndpoint, {
  //   onOpen: () => {
  //     const request = wsRequest("Ether");
  //     console.log(request);
  //     sendMessage(request as string);
  //   },
  //   onMessage: (message) => {
  //     console.log(message, "RAIO");
  //   },
  // });

  return (
    <AssetBalanceContext.Provider value={{ balances, loading }}>
      {children}
    </AssetBalanceContext.Provider>
  );
}

export const useAssetBalance = () => useContext(AssetBalanceContext);
