import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { AssetPrices, AssetType } from "@/@types/assets";
import AssetsManager from "@/models/asset.model";
import { useAuth } from "@/providers/AuthProvider";

export const useAssets = () => {
  const { mnemonic } = useAuth();
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {

      if (!mnemonic) {
        throw new Error("No mnemonic phrase");
      }

      const assetReference = await AsyncStorage.getItem("assets");

      if (!assetReference) {
        throw new Error("asset's not found");
      }

      const assets = JSON.parse(assetReference) as AssetType[];

      return new AssetsManager(assets)
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    meta: {
      persist: false
    }
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
          (asset) => asset.id === newAsset.id
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

export const useUpdateAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(updatedAsset: AssetType) {
      const fetchedAssets = await AsyncStorage.getItem("assets");
      let updatedAssets: AssetType[] = [];
      if (fetchedAssets) {
        updatedAssets = JSON.parse(fetchedAssets);
      }

      const assetIndex = updatedAssets.findIndex(asset => asset.id === updatedAsset.id);

      if (assetIndex !== -1) {
        updatedAssets[assetIndex] = updatedAsset;
        await AsyncStorage.setItem("assets", JSON.stringify(updatedAssets));
      }

      return updatedAssets;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};


export const useAssetPrices = () => {
  return useQuery({
    queryKey: ["assetPrices"],
    queryFn: async () => {
      const response = await fetch("https://assets.osschain.com/market-data");
      const data = await response.json();

      if (!data) {
        throw new Error("asset's not found");
      }


      return data as AssetPrices[]
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });

};
