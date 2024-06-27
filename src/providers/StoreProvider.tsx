import { PropsWithChildren, createContext, useContext, useState } from "react";

export enum StorageKeys {
  Notifications = "notifications",
  NotifsFetchTime = "notifsFetchTime",
  NewNotifsNum = "newNotifsNum",
}

type StoreData = {
  totalBalance: number;
  updateTotalBalance: (amount: number) => void;
};

const StoreContext = createContext<StoreData>({
  totalBalance: 0,
  updateTotalBalance: () => {},
});

export default function StoreProvider({ children }: PropsWithChildren) {
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const updateTotalBalance = (amount: number = 0) => {
    console.log(Number(amount), "OK");
    setTotalBalance((current) => Number(amount) + Number(current));
  };

  return (
    <StoreContext.Provider value={{ totalBalance, updateTotalBalance }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
