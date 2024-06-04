// eslint-disable-next-line import/order
import { useQuery } from "@tanstack/react-query";
import { useAssets } from "./assets";

import { HistoryType } from "@/@types/history";
import { getAdresses } from "@/services/balances.service";
import { OSSblockchain, getChainHistory, getHistories, getTokenHistory } from "@/services/history.service";

export const useHistories = () => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["histories"],
        queryFn: async () => {
            if (!assets) {
                throw new Error("assets is not presented");
            }

            const adresses = getAdresses(assets);
            const histories = await getHistories(adresses);

            return histories
        },
    });
};

export const useHistory = (adress: string | undefined, id: string, blockchain: OSSblockchain | undefined, isToken: boolean) => {
    return useQuery({
        queryKey: ["history", id],
        queryFn: async () => {

            if (!blockchain) {
                throw new Error("blockchain is not presented");
            }

            if (!adress) {
                throw new Error("blockchain is not presented");
            }

            const histories: HistoryType[] = []

            if (!isToken) {
                const history = await getChainHistory(adress, blockchain) || [];


                histories.push(...history)
            }

            if (isToken) {
                const history = await getTokenHistory(adress, blockchain) || [];
                histories.push(...history)
            }


            return histories
        },
    });
};