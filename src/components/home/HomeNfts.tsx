import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

import NftItem from "../nft/NftItem";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import SpacerUi from "../ui/SpacerUi";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { useNfts } from "@/app/api/nft";
import { findAsset } from "@/util/findAsset";

const HomeNfts = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: nfts, isError, isLoading: isNftLoading } = useNfts(10);
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const { isLoading: isBalancesLoading } = UseBalances();

  if (isNftLoading || isBalancesLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (!nfts?.length || isError) {
    return <AlertWithImageUI title={t("wallet.home.index.nft-allert-error")} />;
  }

  return (
    <FlatList
      data={nfts}
      showsVerticalScrollIndicator={false}
      key={2}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <SpacerUi style={{ width: "48%" }} size="xl">
          <Link
            href={{
              pathname: `/(wallet)/home/nft/${item.contractAddress}`,
              params: {
                blockchain: item.blockchain,
                tokenId: item.tokenId,
              },
            }}
            asChild
          >
            <TouchableOpacity>
              <NftItem
                networkUri={findAsset(assets, item.blockchain)?.icon}
                uri={item.image}
                title={item.name}
                collection={item.collectionName}
              />
            </TouchableOpacity>
          </Link>
        </SpacerUi>
      )}
      refreshControl={
        <RefreshControl
          onRefresh={async () => {
            await queryClient.invalidateQueries({ queryKey: ["nfts"] });
          }}
          refreshing={false}
        />
      }
    />
  );
};

export default HomeNfts;
