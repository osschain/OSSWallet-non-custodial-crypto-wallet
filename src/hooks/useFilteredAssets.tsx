import { Blockchain } from "@ankr.com/ankr.js";
import { useMemo } from "react";

import { AssetType } from "@/@types/assets";

const useFilteredAssets = (
  assets: AssetType[] | undefined,
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
