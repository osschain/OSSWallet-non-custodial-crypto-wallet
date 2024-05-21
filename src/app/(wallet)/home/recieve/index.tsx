import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
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
import { networks } from "@/util/mock";

export default function Recieve() {
  const { t } = useTranslation();
  const { assets } = useAsset();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets; // No search term, show all
    }
    return assets?.filter((asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <NetworkOptions
        ref={bottomSheetRef}
        networks={networks}
        onSelect={() => {}}
      />

      <SpacerUi size="xl">
        <NetworkButton onPress={handlePresentModalPress}>
          {t("shared.all")} {t("shared.network")}
        </NetworkButton>
      </SpacerUi>
      <SpacerUi size="xl">
        <AssetList>
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AssetItem asset={item} />}
          />
        </AssetList>
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({ asset }: { asset: AssetType }) => (
  <SpacerUi size="3xl">
    <Link href={`/(wallet)/home/recieve/${asset.id}`}>
      <TouchableOpacity>
        <ItemUi
          title={asset.symbol}
          uri={asset.icon}
          description={asset.name}
        />
      </TouchableOpacity>
    </Link>
  </SpacerUi>
);

const AssetList = styled.View``;
