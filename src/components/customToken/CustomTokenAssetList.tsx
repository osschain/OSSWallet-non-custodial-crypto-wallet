import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

import { AssetType } from "@/@types/assets";
import { useAssets, useUpdateAsset } from "@/app/api/assets";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import ItemUi from "@/components/ui/ItemUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";
import FlatListUi from "../ui/FlatListUi";

const CustomTokenAssetList = ({ query }: { query: string }) => {
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const { mutate: updateAsset } = useUpdateAsset();
  const { t } = useTranslation();
  const filteredAssets = useMemo(() => {
    if (!query) {
      return assets;
    }
    return assets?.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query.toLowerCase()) ||
        asset.contractAddress?.toLowerCase().includes(query.toLowerCase())
    );
  }, [assets, query]);

  const handleAssetShow = (item: AssetType) => {
    const asset: AssetType = {
      ...item,
      isShown: !item.isShown,
    };
    updateAsset(asset);
  };

  if (!assets) {
    return (
      <AlertWithImageUI
        title={t("wallet.home.custom-token.index.no-custom-tokens-alert")}
      />
    );
  }
  return (
    <FlatListUi
      contentContainerStyle={{ paddingTop: 10 }}
      data={filteredAssets}
      renderItem={({ item }) => (
        <SpacerUi size="xl" position="bottom">
          <ItemUi
            uri={item.icon}
            title={item.name}
            right={
              <SpacerUi position="right">
                <SwitchUi
                  value={item.isShown}
                  onSwitch={() => {
                    handleAssetShow(item);
                  }}
                />
              </SpacerUi>
            }
          />
        </SpacerUi>
      )}
    />
  );
};

export default CustomTokenAssetList;
