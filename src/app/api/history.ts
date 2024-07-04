import { keepPreviousData, useQuery, useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

import { useAssets } from "./assets";

import History, { PageTokensType } from "@/models/history.model";
import {
  OSSblockchain,
  getEvmChainHistories,
  getEvmTokenHistories,
  getEvmHistory,
} from "@/services/history.service";




interface PageParam {
  page: number;
  pageTokens: PageTokensType | undefined;
}

export const useInfiniteHistories = () => {
  const { data: assetManager } = useAssets();

  return useInfiniteQuery<History, Error, InfiniteData<History>, string[], PageParam>({
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

};
export const useInfiniteHistory = ({
  address,
  id,
  blockchain,
  isToken,
}: UseHistoryProps) => {
  return useInfiniteQuery<History, Error, InfiniteData<History>>({
    queryKey: ['history', id],
    queryFn: async ({ pageParam }) => {
      if (!blockchain) {
        throw new Error('blockchain is not presented');
      }
      if (!address) {
        throw new Error('address is not presented');
      }
      if (!id) {
        throw new Error('id is not presented');
      }
      if (blockchain === 'btc' || blockchain === 'solana') {
        throw new Error('Unsupported blockchain');
      }

      let history: History | undefined;

      if (!isToken) {
        const evmChainHistory = await getEvmChainHistories({
          address,
          blockchain,
          pageParam: pageParam as PageParam
        });

        history = new History(evmChainHistory.histories, {
          chain: evmChainHistory.pageToken,
          token: undefined,
          nft: undefined,
        });
      }

      if (isToken) {
        const evmTokenHistory = await getEvmTokenHistories({
          address,
          blockchain,
          pageParam: pageParam as PageParam
        });

        history = new History(evmTokenHistory.histories, {
          chain: undefined,
          token: evmTokenHistory.pageToken,
          nft: undefined,
        });
      }

      if (!history) {
        throw new Error('No history found');
      }

      return history;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasPageToken
        ? { page: 10, pageTokens: lastPage.pageTokens }
        : undefined;
    },
    initialPageParam: { page: 10, pageTokens: undefined },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: { pages: [], pageParams: [] },
  });
};
