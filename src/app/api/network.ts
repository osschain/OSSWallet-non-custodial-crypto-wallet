import { useQuery } from "@tanstack/react-query";

import { useAssets } from "./assets";

import { NetworkType } from "@/@types/network";


export const UseNetworks = () => {
    const { data: assetManager } = useAssets()

    return useQuery({
        queryKey: ["networks"],
        queryFn: async () => {
            if (!assetManager) throw new Error("NO ASSETS")

            const networks: NetworkType[] = assetManager.getEvmlockchains.map(chain => {
                return { icon: chain.icon, label: chain.name, blockchain: chain.blockchain }
            }) as NetworkType[]

            return networks
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};