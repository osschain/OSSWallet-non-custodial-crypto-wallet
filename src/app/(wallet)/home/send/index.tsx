import { Blockchain } from "@ankr.com/ankr.js";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
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

export default function Send() {
  const [network, setNetwork] = useState<Blockchain | null>(null);

  const { data: networks } = UseNetworks();
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useFilteredAssets(assets, searchQuery, network);

  if (!assets) {
    return <AlertWithImageUI title={t("shared.asset-error")} />;
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
          renderItem={({ item }) => <AssetItem key={item.name} asset={item} />}
        />
      </SpacerUi>
    </ContainerUi>
  );
}

const AssetItem = ({ asset }: { asset: AssetType }) => {
  const { data: balance } = UseBalances(
    asset.account.address,
    asset.blockchain,
    asset.contractAddress
  );

  return (
    <SpacerUi size="3xl">
      <Link
        href={{
          pathname: `/(wallet)/home/send/${asset.id}`,
          params: {
            balance,
          },
        }}
        asChild
      >
        <TouchableOpacity>
          <ItemUi
            title={asset.name}
            uri={asset.icon}
            descUri={asset.contractAddress}
            leftBottom={<BodyTextUi>{asset.symbol}</BodyTextUi>}
            right={
              <BodyTextUi weight="regular">
                {balance} {asset.symbol}
              </BodyTextUi>
            }
          />
        </TouchableOpacity>
      </Link>
    </SpacerUi>
  );
};
