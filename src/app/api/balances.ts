import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { getBalances } from "@/services/balances.service";


export const Usebalances = () => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["balances"],
        queryFn: async () => {
            if (!assets) return;

            const balances = await getBalances(assets);

            return balances
        },
    });
};