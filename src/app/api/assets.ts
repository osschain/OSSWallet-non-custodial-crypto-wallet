import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AssetType } from "@/@types/assets";
import { useAuth } from "@/providers/AuthProvider";

export const useAssets = () => {
  const { mnemonic } = useAuth();
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      if (!mnemonic) {
        throw new Error("No mnemonic phrase");
      }

      const assets = await AsyncStorage.getItem("assets");

      if (!assets) {
        throw new Error("asset's not found");
      }
      return JSON.parse(assets) as AssetType[];
    },
  });
};

export const useAddAssets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(assets: AssetType[]) {
      const fetchedAssets = await AsyncStorage.getItem("assets");
      let updatedAssets: AssetType[] = [];

      if (fetchedAssets) {
        updatedAssets = JSON.parse(fetchedAssets);
      }

      // Check for unique assets
      assets.forEach((newAsset) => {
        const existingIndex = updatedAssets.findIndex(
          (asset) => asset.contractAddress === newAsset.contractAddress
        );
        if (existingIndex === -1) {
          updatedAssets.push(newAsset);
        } else {
          // Update existing asset if needed
          // For example:
          // updatedAssets[existingIndex] = newAsset;
        }
      });

      await AsyncStorage.setItem("assets", JSON.stringify(updatedAssets));

      return updatedAssets;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["assets"] });
      await queryClient.invalidateQueries({ queryKey: ["balances"] });
    },
  });
};
