import { useQuery } from "@tanstack/react-query";

import { getNetworks } from "@/services/asset.service";


export const useNetworks = () => {
    return useQuery({
        queryKey: ["networks"],
        queryFn: async () => {
            const networks = getNetworks();

            return networks

        },
    });
};