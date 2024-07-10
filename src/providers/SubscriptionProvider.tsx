import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { HistoryType } from "@/@types/history";
import { nftType } from "@/@types/nft";
import { useAssets } from "@/app/api/assets";
import {
  blockhainToTatumChains,
  tatumChainToBlockhain,
} from "@/config/blockchain";
import History from "@/models/history.model";
import { OSSblockchain } from "@/services/history.service";
import { getLastTransactions, subscribe } from "@/services/subscriptions";
import { unixTimestampToDate } from "@/util/unixToDate";

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
  const evmAddress = assetManager?.evmAddress;
  useEffect(() => {
    if (assetManager?.assets && shownAsset) {
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
        address: evmAddress as string,
      });

      const data = respo[0]?.data;
      console.log(data);

      if (!data) return;
      // const counterAddres = data?.counterAddress;
      // const asset = data?.asset;

      // console.log(counterAddres, asset);
      const {
        chain,
        asset,
        counterAddress,
        address,
        amount,
        txId,
        timestamp,
        tokenId,
      } = data;
      const transaction: HistoryType = {
        blockchain: chain as OSSblockchain,
        id:
          tatumChainToBlockhain[asset] !== undefined
            ? tatumChainToBlockhain[asset]
            : (asset as string).toLocaleLowerCase(),
        to: counterAddress,
        from: address,
        value: amount,
        key: uuidv4(),
        hash: txId,
        date: timestamp ? unixTimestampToDate(timestamp) : undefined,
        type: tokenId ? "NFT" : "TOKEN",
      };

      console.log(transaction);
      updateHistory(transaction);
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
