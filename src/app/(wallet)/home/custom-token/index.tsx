import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

import { AssetType } from "@/@types/assets";
import { useAssets, useUpdateAsset } from "@/app/api/assets";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import ButtonUi from "@/components/ui/ButtonUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";
import { TextInputUi } from "@/components/ui/TextInputUi";

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const { mutate: updateAsset } = useUpdateAsset();
  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets;
    }
    return assets?.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.contractAddress?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [assets, searchQuery]);

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
    <ContainerUi>
      <BodyUi>
        <SpacerUi size="lg">
          <TextInputUi
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t(
              "wallet.home.custom-token.index.search-input-placeholder"
            )}
            left={
              <IconUi
                library="AntDesign"
                name="search1"
                size="xl"
                color="icon-second"
              />
            }
          />
        </SpacerUi>

        <SpacerUi size="xl" style={{ flex: 1 }}>
          <FlatList
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
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <Link href="/(wallet)/home/custom-token/add-custom-token" asChild>
          <ButtonUi
            icon={
              <IconUi
                library="Feather"
                name="plus"
                size="xl"
                color="icon-primary"
              />
            }
          >
            {t("wallet.home.custom-token.index.add-button-text")}
          </ButtonUi>
        </Link>
      </FooterUi>
    </ContainerUi>
  );
}

export default Index;
