import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket from "react-native-use-websocket";
import { useAsset } from "./AssetProvider";
import { getBalances } from "@/services/balances.service";

const ethUrl =
  "wss://rpc.ankr.com/eth/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const btcUrl =
  "wss://rpc.ankr.com/eth/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const PolygonUrl =
  "wss://rpc.ankr.com/polygon_zkevm/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const bnbUrl =
  "wss://rpc.ankr.com/bsc/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const solanaUrl =
  "wss://rpc.ankr.com/solana/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const avalancheUrl =
  "wss://rpc.ankr.com/avalanche/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const mantleUrl =
  "wss://rpc.ankr.com/mantle/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

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

const request =
  '{  "jsonrpc": "2.0",  "method": "eth_getBalance",  "params": ["0x8D97689C9818892B700e27F316cc3E41e17fBeb9", "latest"],  "id": 1 }';

export default function AssetBalanceProvider({ children }: PropsWithChildren) {
  const [balances, setBalances] = useState<balanceType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { assets } = useAsset();
  useEffect(() => {
    if (!assets) return;
    const bootstrapAsync = async () => {
      const balance = await getBalances(assets);
      setBalances(balance);
      console.log(balance);
      setLoading(false);
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
