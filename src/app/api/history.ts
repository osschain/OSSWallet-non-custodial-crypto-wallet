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
            if (!assets) return;

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
            if (!adress || !blockchain) return;

            const history = await getHistory(adress, blockchain);

            return history
        },
    });
};