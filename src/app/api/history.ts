import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import History from "@/models/history.model";
import {
  OSSblockchain,
  getEvmChainHistories,
  getEvmTokenHistories,
  getEvmHistory,
} from "@/services/history.service";

export const useHistories = (page: number, pageToken: string | undefined) => {
  const { data: assetManager } = useAssets();
  return useQuery({
    queryKey: ["histories", page],
    queryFn: async () => {
      if (!assetManager) {
        throw new Error("assets is not presented");
      }

      const history = await getEvmHistory(
        assetManager.evmAddress,
        page,
        assetManager.shownEvmBlockchain,
        pageToken
      );

      const filteredHistory = history.histories.filter((history) =>
        assetManager.shownIds.includes(history.id.toLowerCase())
      );

      return new History(filteredHistory, history.nextPageToken);
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

type UseHistoryProps = {
  address: string | undefined;
  id: string | undefined;
  blockchain: OSSblockchain | undefined;
  isToken: boolean;
  page: number;
  pageToken: string | undefined;
};

export const useHistory = ({
  address,
  id,
  blockchain,
  isToken,
  page,
  pageToken,
}: UseHistoryProps) => {
  return useQuery({
    queryKey: ["history", id, page],
    queryFn: async () => {
      if (!blockchain) {
        console.log("blockchain is not presented");
        throw new Error();
      }
      if (!address) {
        console.log("address is not presented");
        throw new Error();
      }

      if (!id) {
        console.log("id is not presented");
        throw new Error();
      }

      if (blockchain === "btc" || blockchain === "solana") {
        throw new Error();
      }

      let history: History | undefined;

      if (!isToken) {
        const evmChainHistory = await getEvmChainHistories({
          address,
          blockchain,
          page,
          pageToken,
        });
        history = evmChainHistory;
      }

      if (isToken) {
        const evmTokenHistory = await getEvmTokenHistories({
          address,
          blockchain,
          page,
          pageToken,
        });
        history = evmTokenHistory;
      }

      if (!history) {
        throw new Error();
      }

      return history;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
