import { Blockchain } from "@ankr.com/ankr.js";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import { UseNetworks } from "@/app/api/network";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import useFilteredAssets from "@/hooks/useFilteredAssets";
import { findAsset } from "@/util/findAsset";

export default function Recieve() {
  const [network, setNetwork] = useState<Blockchain | null>(null);
  const { t } = useTranslation();
  const { data: assets } = useAssets();
  const { data: networks } = UseNetworks();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useFilteredAssets(assets, searchQuery, network);

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
        <NetworkOptions
          networks={networks}
          onSelect={(selected) => setNetwork(selected)}
        />
      </SpacerUi>
      <SpacerUi size="xl" style={{ flex: 1 }}>
        <FlatList
          data={filteredAssets}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <AssetItem asset={item} assets={assets} />}
        />
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({
  asset,
  assets,
}: {
  assets: AssetType[];
  asset: AssetType;
}) => (
  <SpacerUi size="3xl">
    <Link href={`/(wallet)/home/recieve/${asset.blockchain}`}>
      <TouchableOpacity>
        <ItemUi
          title={asset.name}
          uri={asset.icon}
          description={asset.symbol}
          descUri={
            asset.contractAddress
              ? findAsset(assets, asset.blockchain)?.icon
              : undefined
          }
        />
      </TouchableOpacity>
    </Link>
  </SpacerUi>
);
