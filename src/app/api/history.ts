import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import History, { PageTokensType } from "@/models/history.model";
import {
  OSSblockchain,
  getEvmChainHistories,
  getEvmTokenHistories,
  getEvmHistory,
} from "@/services/history.service";

export const useHistories = (page: number, pageTokens: PageTokensType | undefined) => {
  const { data: assetManager } = useAssets();
  return useQuery({
    queryKey: ["histories", pageTokens],
    queryFn: async () => {
      if (!assetManager) {
        throw new Error("assets is not presented");
      }

      const history = await getEvmHistory(
        assetManager.evmAddress,
        page,
        assetManager.shownEvmBlockchain,
        pageTokens
      );

      const filteredHistory = history.histories.filter((history) =>
        assetManager.shownIds.includes(history.id.toLowerCase())
      );

      return new History(filteredHistory, history.pageTokens);
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
  pageTokens: PageTokensType | undefined;
};

export const useHistory = ({
  address,
  id,
  blockchain,
  isToken,
  page,
  pageTokens,
}: UseHistoryProps) => {
  return useQuery({
    queryKey: ["history", id, pageTokens],
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
          pageToken: pageTokens?.chain,
        });

        history = new History(evmChainHistory.histories, { chain: evmChainHistory.pageToken, token: undefined, nft: undefined });
      }

      if (isToken) {
        const evmTokenHistory = await getEvmTokenHistories({
          address,
          blockchain,
          page,
          pageToken: pageTokens
            ?.token,
        });

        history = new History(evmTokenHistory.histories, { chain: undefined, token: evmTokenHistory.pageToken, nft: undefined });
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
