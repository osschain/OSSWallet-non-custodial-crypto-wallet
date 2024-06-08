// eslint-disable-next-line import/order
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import { getAdresses } from "@/services/balances.service";
import { OSSblockchain, getChainHistories, getHistories, getTokenHistories } from "@/services/history.service";

export const useHistories = (page: number) => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["histories", page],
        queryFn: async () => {
            if (!assets) {
                throw new Error("assets is not presented");
            }

            const addresses = getAdresses(assets);
            const histories = await getHistories(addresses, page);

            return histories
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

            const histories: HistoryType[] = []
            console.log("Refffetch")
            if (!isToken) {
                const history = await getChainHistories({ address, blockchain, page }) || [];
                histories.push(...history)
            }

            if (isToken) {
                const history = await getTokenHistories({ address, blockchain, page }) || [];
                histories.push(...history)
            }


            return histories
        },
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};