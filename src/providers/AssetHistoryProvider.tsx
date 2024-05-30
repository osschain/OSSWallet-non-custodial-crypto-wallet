import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket from "react-native-use-websocket";
import { useAsset } from "./AssetProvider";

import { getAdresses, getBalances } from "@/services/balances.service";
import { getHistories, getHistory } from "@/services/history.service";
import { Blockchain } from "@ankr.com/ankr.js";

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

export type HistoryType = {
  from: string;
  to: string | undefined;
  value: string;
};

export type AssetHistoryType = {
  histories: HistoryType[] | null;
  loading: boolean;
  fetchHistories: () => void;
  fetchHistory: (
    adress: string,
    ankrEndpoint: Blockchain | "btc" | "solana"
  ) => void;
  cashedHistory: {
    [key: string]: HistoryType[] | [] | undefined;
  };
};

const AssetHistoryContext = createContext<AssetHistoryType>({
  histories: null,
  loading: true,
  fetchHistories: () => {},
  fetchHistory: () => {},
  cashedHistory: {},
});

const request =
  '{  "jsonrpc": "2.0",  "method": "eth_getBalance",  "params": ["0x8D97689C9818892B700e27F316cc3E41e17fBeb9", "latest"],  "id": 1 }';

export default function AssetHistoryPRovider({ children }: PropsWithChildren) {
  const [histories, setHistories] = useState<HistoryType[] | null>(null);

  const [cashedHistory, setCashedHistory] = useState<{
    [key: string]: HistoryType[] | [] | undefined;
  }>({});

  const [loading, setLoading] = useState(true);
  const { assets } = useAsset();

  const fetchHistories = async () => {
    if (!assets) return;
    setLoading(true);
    try {
      const adresses = getAdresses(assets);
      const histories = await getHistories(adresses);

      setHistories(histories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (
    adress: string,
    ankrEndpoint: Blockchain | "btc" | "solana"
  ) => {
    setLoading(true);
    try {
      const history = await getHistory(adress, ankrEndpoint);

      if (!history) {
        throw new Error("Somethin went wrong");
      }

      setCashedHistory((prevCache) => ({
        ...prevCache,
        [ankrEndpoint]: history,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    <AssetHistoryContext.Provider
      value={{
        histories,
        loading,
        fetchHistories,
        fetchHistory,
        cashedHistory,
      }}
    >
      {children}
    </AssetHistoryContext.Provider>
  );
}

export const useAssetHistory = () => useContext(AssetHistoryContext);
