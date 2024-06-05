import { useQuery } from "@tanstack/react-query";

import { getNetworks } from "@/services/asset.service";
import { useAssets } from "./assets";


export const UseNetworks = () => {
    const { data: assets } = useAssets()
    return useQuery({
        queryKey: ["networks"],
        queryFn: async () => {
            if (!assets) throw new Error("NO ASSETS")

            const evmChains = assets.filter((asset) => asset["slip-0044"] === 60 && !asset.contractAddress)

            const network = evmChains.map(chain => {
                return { icon: chain.icon, label: chain.name }
            })
            return network
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};