import { Blockchain } from "@ankr.com/ankr.js";
import { InfiniteData, keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import Nft, { NftPageTokensType } from "@/models/nft.model";
import { getEvmNft, getEvmNfts } from "@/services/nft.service";

interface PageParam {
  page: number;
  pageTokens: NftPageTokensType | undefined;
}
export const useInfiniteNfts = () => {
  const { data: assetManager } = useAssets();

  return useInfiniteQuery<Nft, Error, InfiniteData<Nft>, string[], PageParam>({
    queryKey: ['histories'],
    queryFn: async ({ pageParam }) => {
      if (!assetManager) {
        throw new Error("assets is not presented");
      }

      const nfts = await getEvmNfts(assetManager.evmAddress, pageParam.page, undefined);

      if (!nfts) {
        throw new Error();
      }
      return nfts;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasPageToken
        ? { page: 10, pageTokens: lastPage.pageTokens }
        : undefined;
    },
    initialPageParam: { page: 3, pageTokens: undefined },
    placeholderData: { pages: [], pageParams: [] },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useNfts = (page: number) => {
  const { data: assetsManager } = useAssets();

  return useQuery({
    queryKey: ["nfts", page],
    queryFn: async () => {
      if (!assetsManager) {
        throw new Error("assets is not presented");
      }

      const nfts = await getEvmNfts(assetsManager.evmAddress, page, undefined);

      if (!nfts) {
        throw new Error();
      }
      return nfts;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });
};

export const useNft = (
  address: string,
  blockchain: Blockchain,
  tokenId: string
) => {
  return useQuery({
    queryKey: ["nft", address],
    queryFn: async () => {
      const nft = await getEvmNft(address, blockchain, tokenId);
      return nft;
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,

  });
};
