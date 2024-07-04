import { keepPreviousData, useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import History, { PageTokensType } from "@/models/history.model";
import {
  OSSblockchain,
  getEvmChainHistories,
  getEvmTokenHistories,
  getEvmHistory,
} from "@/services/history.service";

const fetchProjects = async ({ pageParam = 0 }) => {
  const res = await fetch('/api/projects?cursor=' + pageParam)
  return res.json()
}


interface PageParam {
  page: number;
  pageTokens: PageTokensType | undefined;
}

export const useInfiniteHistories = () => {
  const { data: assetManager } = useAssets();

  return useInfiniteQuery<History, Error, History, string[], PageParam>({
    queryKey: ['histories'],
    queryFn: async ({ pageParam }) => {
      if (!assetManager) {
        throw new Error('assets is not presented');
      }

      const history = await getEvmHistory(
        {
          address: assetManager.evmAddress,
          blockchain: assetManager.shownEvmBlockchain,
          pageParam
        }
      );

      const filteredHistory = history.histories.filter((history) =>
        assetManager.shownIds.includes(history.id.toLowerCase())
      );

      return new History(filteredHistory, history.pageTokens);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasPageToken
        ? { page: 3, pageTokens: lastPage.pageTokens }
        : undefined;
    },
    initialPageParam: { page: 3, pageTokens: undefined },
    placeholderData: { pages: [], pageParams: [] },
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
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,

  });
};
