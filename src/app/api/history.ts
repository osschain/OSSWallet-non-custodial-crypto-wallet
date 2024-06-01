// eslint-disable-next-line import/order
import { useQuery } from "@tanstack/react-query";
import { useAssets } from "./assets";

import { getAdresses } from "@/services/balances.service";
import { OSSblockchain, getHistories, getHistory } from "@/services/history.service";

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

export const useHistory = (adress: string | undefined, blockchain: OSSblockchain | undefined) => {
    return useQuery({
        queryKey: ["history", blockchain],
        queryFn: async () => {

            if (!blockchain) {
                throw new Error("blockchain is not presented");
            }

            if (!adress) {
                throw new Error("blockchain is not presented");
            }

            const history = await getHistory(adress, blockchain);

            return history
        },
    });
};