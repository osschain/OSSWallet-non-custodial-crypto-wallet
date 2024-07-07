import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

import { HistoryType } from "@/@types/history";
import { nftType } from "@/@types/nft";
import { useAssets } from "@/app/api/assets";
import { blockhainToTatumChains } from "@/config/blockchain";
import History from "@/models/history.model";
import { getLastTransactions, subscribe } from "@/services/subscriptions";

export enum StorageKeys {
  Notifications = "notifications",
  NotifsFetchTime = "notifsFetchTime",
  NewNotifsNum = "newNotifsNum",
}

type SubscriptionData = {
  updateHistory: (history: HistoryType) => void;
  updateNfts: (nft: nftType) => void;
};

const SubscriptionContext = createContext<SubscriptionData>({
  updateHistory: () => {},
  updateNfts: () => {},
});

export default function SubscriptionProvider({ children }: PropsWithChildren) {
  const { data: assetManager } = useAssets();
  const shownAsset = assetManager?.shownBlockhains;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (assetManager?.assets) {
      for (const asset of shownAsset) {
        subscribe({
          blockchain: blockhainToTatumChains[asset.blockchain],
          address: asset.account.address,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetManager?.assets]);

  useEffect(() => {
    setInterval(async () => {
      const respo = await getLastTransactions({
        address: "0x0e03d6230e5aB5745956368450eE5765f1D048cD",
      });
      console.log(respo, "NEW RES");
    }, 10000);
  }, []);

  const updateHistory = (history: HistoryType) => {
    queryClient.setQueryData(
      ["histories"],
      (oldData: InfiniteData<History>) => {
        const newPages = oldData.pages.map((page) => ({
          ...page,
          histories: [history, ...page.histories],
        }));
        return {
          ...oldData,
          pages: newPages,
        };
      }
    );

    queryClient.setQueryData(
      ["history", history.id],
      (oldData: InfiniteData<History>) => {
        const newPages = oldData.pages.map((page) => ({
          ...page,
          histories: [history, ...page.histories],
        }));
        return {
          ...oldData,
          pages: newPages,
        };
      }
    );
  };

  const updateNfts = (nft: nftType) => {};

  return (
    <SubscriptionContext.Provider value={{ updateHistory, updateNfts }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export const useSubsraptions = () => useContext(SubscriptionContext);
