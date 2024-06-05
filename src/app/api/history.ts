// eslint-disable-next-line import/order
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import { getAdresses } from "@/services/balances.service";
import { OSSblockchain, getChainHistory, getHistories, getTokenHistory } from "@/services/history.service";

export const useHistories = (page: number) => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["histories", page],
        queryFn: async () => {
            if (!assets) {
                throw new Error("assets is not presented");
            }

            const adresses = getAdresses(assets);
            const histories = await getHistories(adresses, page);

            return histories
        },
        placeholderData: keepPreviousData
    });
};

export const useHistory = (adress: string | undefined, id: string, blockchain: OSSblockchain | undefined, isToken: boolean, page: number) => {
    return useQuery({
        queryKey: ["history", id, page],
        queryFn: async () => {

            if (!blockchain) {
                throw new Error("blockchain is not presented");
            }

            if (!adress) {
                throw new Error("adress is not presented");
            }

            const histories: HistoryType[] = []

            if (!isToken) {
                const history = await getChainHistory(adress, blockchain, page) || [];
                histories.push(...history)
            }

            if (isToken) {
                const history = await getTokenHistory(adress, blockchain, page) || [];
                histories.push(...history)
            }


            return histories
        },
    });
};