import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
// eslint-disable-next-line import/no-duplicates
import { useAsset } from "@/providers/AssetProvider";
// eslint-disable-next-line import/no-duplicates
import { AssetType } from "@/providers/AssetProvider";

export default function Recieve() {
  const { t } = useTranslation();
  const { assets } = useAsset();
  const { networks } = useAsset();

  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets; // No search term, show all
    }
    return assets?.filter((asset) =>
      asset.blockchain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [assets, searchQuery]);

  if (!assets) {
    return <AlertWithImageUI title="No Chains To Display" />;
  }

  return (
    <ContainerUi>
      <TextInputUi
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t("shared.search")}
        left={
          <IconUi
            library="AntDesign"
            name="search1"
            size="xl"
            color="icon-second"
          />
        }
      />

      <SpacerUi size="xl">
        <NetworkOptions networks={networks} onSelect={() => {}} />
      </SpacerUi>
      <SpacerUi size="xl">
        <AssetList>
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <AssetItem asset={item} />}
          />
        </AssetList>
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({ asset }: { asset: AssetType }) => (
  <SpacerUi size="3xl">
    <Link href={`/(wallet)/home/recieve/${asset.blockchain}`}>
      <TouchableOpacity>
        <ItemUi
          title={asset.symbol}
          uri={asset.icon}
          description={asset.blockchain}
        />
      </TouchableOpacity>
    </Link>
  </SpacerUi>
);

const AssetList = styled.View``;
