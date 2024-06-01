import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { getBalances } from "@/services/balances.service";


export const UseBalances = () => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["balances"],
        queryFn: async () => {

            if (!assets) {
                throw new Error("Asset is not presented");
            }

            const balances = await getBalances(assets);
            console.log(balances)
            return balances
        },
    });
};