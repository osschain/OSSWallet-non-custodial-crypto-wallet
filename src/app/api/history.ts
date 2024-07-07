import { useInfiniteQuery, InfiniteData, useQueryClient } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import History, { PageTokensType } from "@/models/history.model";
import {
  OSSblockchain,
  getEvmChainHistories,
  getEvmTokenHistories,
  getEvmHistory,
  getEvmNftHistories,
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
      const hasPageToken = Object.values(lastPage.pageTokens).some(value => value !== undefined);
      return hasPageToken
        ? { page: 3, pageTokens: lastPage.pageTokens }
        : undefined;
    },
    initialPageParam: { page: 3, pageTokens: undefined },
    placeholderData: { pages: [], pageParams: [] },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => {
      const newPages = data.pages.map((page) => {
        return new History(page.histories, page.pageTokens)
      });
      return {
        ...data,
        pages: newPages,
      };
    },
  });
};

type UseHistoryProps = {
  address: string | undefined;
  id: string;
  blockchain: OSSblockchain | undefined;
  isToken: boolean;

};
export const useInfiniteHistory = ({
  address,
  id,
  blockchain,
  isToken,
}: UseHistoryProps) => {
  return useInfiniteQuery<History, Error, InfiniteData<History>, string[], PageParam>({
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
      const isInitial = !pageParam.pageTokens

      if (!isToken) {
        const historiesPlaceholder: HistoryType[] = [];
        const pageTokensHolder: PageTokensType = {
          nft: undefined,
          token: undefined,
          chain: undefined,
        };

        const chainHistoryPromise = (pageParam.pageTokens?.chain || isInitial) && getEvmChainHistories({ address, blockchain, pageParam });
        const nftHistoryPromise = (pageParam.pageTokens?.nft || isInitial) && getEvmNftHistories({ address, blockchain, pageParam });

        const [chainHistory, nftHistory] = await Promise.all([chainHistoryPromise, nftHistoryPromise]);

        if (chainHistory) {
          historiesPlaceholder.push(...chainHistory.histories);
          pageTokensHolder.chain = chainHistory.pageToken;
        }

        if (nftHistory) {
          historiesPlaceholder.push(...nftHistory.histories);
          pageTokensHolder.nft = nftHistory.pageToken;
        }

        history = new History(historiesPlaceholder, {
          chain: pageTokensHolder.chain,
          token: undefined,
          nft: pageTokensHolder.nft,
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
      const hasPageToken = Object.values(lastPage.pageTokens).some(value => value !== undefined);
      return hasPageToken
        ? { page: 10, pageTokens: lastPage.pageTokens }
        : undefined;
    },
    initialPageParam: { page: 10, pageTokens: undefined },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: { pages: [], pageParams: [] },
    select: (data) => {
      const newPages = data.pages.map((page) => {
        return new History(page.histories, page.pageTokens)
      });
      return {
        ...data,
        pages: newPages,
      };
    },
  });
};
