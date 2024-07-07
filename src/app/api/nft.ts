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
    queryKey: ['nfts'],
    queryFn: async ({ pageParam }) => {
      if (!assetManager) {
        throw new Error("assets is not presented");
      }
      console.log("RUN NFTS")

      const nfts = await getEvmNfts(assetManager.evmAddress, pageParam.page, pageParam.pageTokens?.evm);

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
    initialPageParam: { page: 10, pageTokens: undefined },
    placeholderData: { pages: [], pageParams: [] },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!assetManager,
    select: (data) => {
      const newPages = data.pages.map((page) => {
        return new Nft(page.nfts, page.pageTokens)
      });
      return {
        ...data,
        pages: newPages,
      };
    }
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
