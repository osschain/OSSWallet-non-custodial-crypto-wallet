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
import BodyTextUi from "@/components/ui/BodyTextUi";
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
  const { data: assetManager, isError } = useAssets();
  const assets = assetManager?.assets;
  const { data: networks } = UseNetworks();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useFilteredAssets(assets, searchQuery, network);

  if (isError || !assets?.length) {
    return (
      <AlertWithImageUI title={t("wallet.home.recieve.index.alert-error")} />
    );
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
      <SpacerUi size="xl" fullHeight>
        <FlatList
          showsVerticalScrollIndicator={false}
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
    <Link href={`/(wallet)/home/recieve/${asset.id}`}>
      <TouchableOpacity>
        <ItemUi
          title={asset.name}
          uri={asset.icon}
          leftBottom={<BodyTextUi>{asset.symbol}</BodyTextUi>}
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
