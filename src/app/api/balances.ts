import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { getBalances } from "@/services/balances.service";

export const UseBalances = () => {
    const { data: assetsManager } = useAssets()
    const assets = assetsManager?.assets;

    return useQuery({
        queryKey: ["balances"],
        queryFn: async () => {
            if (!assets) {
                throw new Error("Asset is not presented");
            }
            const balances = await getBalances(assetsManager.addresses)

            const shownIds = assetsManager.shownIds;

            const uniqueIds = new Set();

            const filteredBalances = balances.filter(balance => {
                if (shownIds.includes(balance.id) && !uniqueIds.has(balance.id)) {
                    uniqueIds.add(balance.id);
                    return true;
                }
                return false;
            });

            return filteredBalances
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: true
    });
};