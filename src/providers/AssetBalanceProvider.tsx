import { AnkrProvider } from "@ankr.com/ankr.js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket from "react-native-use-websocket";

const provider = new AnkrProvider(
  "https://rpc.ankr.com/multichain/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55"
);

type balanceType = {
  tokenName: string;
  balanceUsd: string;
  balance: string;
};

export type AssetBalanceType = {
  balances: balanceType[];
};

const ethUrl =
  "wss://rpc.ankr.com/eth/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const optimisUrl =
  "wss://rpc.ankr.com/optimism/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const PolygonUrl =
  "wss://rpc.ankr.com/polygon_zkevm/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

const bnbUrl =
  "wss://rpc.ankr.com/bsc/ws/8831f4b105c93c89b13de27e58213e3abe436958016210ab7be03f2fc7d79d55";

type AssetData = {
  assets: AssetBalanceType[] | null;
  addAssets: (Asset: AssetBalanceType[]) => void;
};

const AssetBalanceContext = createContext<AssetData>({
  assets: null,
  addAssets: () => {},
});

const request =
  '{  "jsonrpc": "2.0",  "method": "eth_getBalance",  "params": ["0x8D97689C9818892B700e27F316cc3E41e17fBeb9", "latest"],  "id": 1 }';

export default function AssetBalanceProvider({ children }: PropsWithChildren) {
  const [balances, setBalances] = useState<balanceType[] | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const balance = await getBalances();
      setBalances(balance);
    };
    bootstrapAsync();
  }, []);

  const getBalances = async () => {
    // const balances = await provider.getAccountBalance({
    //   blockchain: ["eth"],
    //   walletAddress: "0xfa9019df60d3c710d7d583b2d69e18d412257617",
    // });
    // const filteredBalane = balances.assets.map(
    //   ({ balance, balanceUsd, tokenName }) => {
    //     return {
    //       balance,
    //       balanceUsd,
    //       tokenName,
    //     };
    //   }
    // );
    // return filteredBalane;
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
    <AssetBalanceContext.Provider value={{}}>
      {children}
    </AssetBalanceContext.Provider>
  );
}

export const useAssetBalance = () => useContext(AssetBalanceContext);
