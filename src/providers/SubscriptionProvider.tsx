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
      try {
        const respo = await getLastTransactions({
          address: evmAddress as string,
        });

        if (!respo || !respo.length)
          throw new Error("Resppo is not defined or it is empty");

        const filterResponse = respo?.filter((item: any) => {
          return item?.data?.type !== "fee";
        });

        const data = filterResponse[0]?.data;
        console.log(respo);
        if (!data) return;

        const { receiver_address: counterAddress, sender_address: address } =
          filterResponse[0];

        const { chain, asset, amount, txId, timestamp, tokenId } = data;

        const isRecieved = counterAddress === evmAddress?.toLocaleLowerCase();
        const isNft = tokenId;

        const id =
          tatumChainToBlockhain[asset] !== undefined
            ? tatumChainToBlockhain[asset]
            : (asset as string).toLocaleLowerCase();

        const transaction: HistoryType = {
          id,
          blockchain: chain as OSSblockchain,
          to: counterAddress,
          from: address,
          value: amount,
          key: uuidv4(),
          hash: txId,
          date: timestamp ? unixTimestampToDate(timestamp) : undefined,
          type: tokenId ? "NFT" : "TOKEN",
          timeStamp: timestamp,
        };

        updateHistory(transaction);
        updateBalance(id, amount, isRecieved, isNft);
      } catch (error) {
        console.log(error, "realtime error");
      }
    }, 10000);
  }, []);

  const updateHistory = (history: HistoryType) => {
    queryClient.setQueryData(
      ["histories"],
      (oldData: InfiniteData<History>) => {
        if (!oldData) return;
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
        if (!oldData) return;

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

  const updateBalance = (
    id: string,
    amount: number,
    isReceived: boolean,
    isNft: boolean
  ) => {
    queryClient.setQueryData(
      ["balances", id.toLocaleLowerCase()],
      (oldData: { balance: string | number; price: any }) => {
        let newBalance;

        console.log(":sad", isReceived);

        if (isNft && !isReceived) {
          newBalance = Number(oldData.balance) - Number(amount);
        } else if (isReceived) {
          newBalance = Number(oldData.balance) + Number(amount);
        } else {
          newBalance = Number(oldData.balance) - Number(amount);
        }

        if (newBalance < 0) {
          newBalance = 0;
        }

        console.log(newBalance);

        return {
          ...oldData,
          balance: newBalance.toFixed(4),
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
