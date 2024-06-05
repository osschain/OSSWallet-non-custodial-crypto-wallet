import { useQuery } from "@tanstack/react-query";

import { getNetworks } from "@/services/asset.service";


export const UseNetworks = () => {
    return useQuery({
        queryKey: ["networks"],
        queryFn: async () => {
            const networks = getNetworks();

            return networks

        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};