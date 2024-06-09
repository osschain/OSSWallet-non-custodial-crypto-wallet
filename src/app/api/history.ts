import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import { OSSblockchain, getEvmChainHistories, getEvmTokenHistories, getEvmHistory } from "@/services/history.service";

export const useHistories = (page: number) => {
    const { data: assetManager } = useAssets()
    return useQuery({
        queryKey: ["histories", page],
        queryFn: async () => {
            if (!assetManager) {
                throw new Error("assets is not presented");
            }
            const histories = await getEvmHistory(assetManager.evmAddress, page, assetManager.shownEvmBlockchain);

            const filteredHistory = histories.filter(history => assetManager.shownIds.includes(history.id.toLowerCase()))


            return filteredHistory
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

};

export const useHistory = (address: string | undefined, id: string, blockchain: OSSblockchain | undefined, isToken: boolean, page: number) => {
    return useQuery({
        queryKey: ["history", id, page],
        queryFn: async () => {

            if (!blockchain) {
                throw new Error("blockchain is not presented");
            }

            if (!address) {
                throw new Error("address is not presented");
            }

            if (blockchain === "btc" || blockchain === 'solana') {
                return []
            }



            const histories: HistoryType[] = []
            if (!isToken) {
                const history = await getEvmChainHistories({ address, blockchain, page }) || [];
                histories.push(...history)
            }

            if (isToken) {
                const history = await getEvmTokenHistories({ address, blockchain, page }) || [];
                histories.push(...history)
            }


            return histories
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};