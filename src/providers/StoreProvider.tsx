import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export enum StorageKeys {
  Notifications = "notifications",
  NotifsFetchTime = "notifsFetchTime",
  NewNotifsNum = "newNotifsNum",
}

type StoreData = {
  totalBalance: number;
  updateTotalBalance: (amount: number) => void;
  resetTotalBalance: () => void;
};

const StoreContext = createContext<StoreData>({
  totalBalance: 0,
  resetTotalBalance: () => {},
  updateTotalBalance: () => {},
});

export default function StoreProvider({ children }: PropsWithChildren) {
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const updateTotalBalance = useCallback((amount: number = 0) => {
    console.log(Number(amount), "OK");
    setTotalBalance((current) => Number(amount) + Number(current));
  }, []);

  const resetTotalBalance = () => {
    setTotalBalance(0);
  };

  return (
    <StoreContext.Provider
      value={{ totalBalance, updateTotalBalance, resetTotalBalance }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
