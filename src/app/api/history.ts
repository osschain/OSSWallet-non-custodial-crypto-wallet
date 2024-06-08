// eslint-disable-next-line import/order
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import { getAdresses } from "@/services/balances.service";
import { OSSblockchain, getEvmChainHistories, getHistories, getEvmTokenHistories } from "@/services/history.service";

export const useHistories = (page: number) => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["histories", page],
        queryFn: async () => {
            if (!assets) {
                throw new Error("assets is not presented");
            }

            const shownedAssets = assets.filter(asset => asset.isShown)

            const blockchains = Array.from(new Set(shownedAssets.map(asset => asset.blockchain)))
            const ids = shownedAssets.map(asset => asset.id.toLowerCase())
            const addresses = getAdresses(assets);
            const histories = await getHistories(addresses, page, blockchains);


            return histories.filter(history => ids.includes(history.id.toLowerCase()))
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