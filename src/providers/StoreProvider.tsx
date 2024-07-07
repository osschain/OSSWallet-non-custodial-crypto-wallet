import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export enum StorageKeys {
  Notifications = "notifications",
  NotifsFetchTime = "notifsFetchTime",
  NewNotifsNum = "newNotifsNum",
}

type Balance = {
  asset: string;
  balance: number;
};

type StoreData = {
  totalBalance: number;
  resetTotalBalance: () => void;
  balances: Balance[];
  updateBalances: ({
    asset,
    balance,
  }: {
    asset: string;
    balance: number;
  }) => void;
};

const StoreContext = createContext<StoreData>({
  totalBalance: 0,
  resetTotalBalance: () => {},
  updateBalances: () => {},
  balances: [],
});

export default function StoreProvider({ children }: PropsWithChildren) {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    const totalBalance = balances.reduce((prev, current) => {
      return prev + current.balance;
    }, 0);

    if (!isNaN(totalBalance)) {
      setTotalBalance(totalBalance);
    }
  }, [balances]);

  const updateBalances = ({
    asset,
    balance,
  }: {
    asset: string;
    balance: number;
  }) => {
    setBalances((prev) => {
      const assetIndex = prev.findIndex((item) => item.asset === asset);
      console.log(asset, balance);
      if (assetIndex !== -1) {
        // Asset found, update its balance
        const updatedBalances = [...prev];
        updatedBalances[assetIndex] = { asset, balance };
        return updatedBalances;
      } else {
        // Asset not found, add new asset
        return [...prev, { asset, balance }];
      }
    });
  };

  const resetTotalBalance = () => {
    setTotalBalance(0);
  };

  return (
    <StoreContext.Provider
      value={{ totalBalance, updateBalances, resetTotalBalance, balances }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
