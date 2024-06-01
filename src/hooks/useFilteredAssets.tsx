import { Blockchain } from "@ankr.com/ankr.js";
import { useMemo } from "react";

import { AssetType } from "@/providers/AssetProvider";

const useFilteredAssets = (
  assets: AssetType[] | null,
  searchQuery: string,
  network: Blockchain | null
) => {
  return useMemo(() => {
    if (!assets) return;

    let filtered = assets;

    if (searchQuery) {
      filtered = filtered.filter((asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (network) {
      filtered = filtered.filter(
        (asset) =>
          asset?.network?.toLowerCase === network.toLowerCase() ||
          asset.blockchain === network.toLowerCase()
      );
    }

    return filtered;
  }, [assets, searchQuery, network]);
};

export default useFilteredAssets;
