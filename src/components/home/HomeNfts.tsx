import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import NftItem from "../nft/NftItem";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import FlatListUi from "../ui/FlatListUi";
import SpacerUi from "../ui/SpacerUi";

import { useAssets } from "@/app/api/assets";
import { useInfiniteNfts } from "@/app/api/nft";
import { findAsset } from "@/util/findAsset";

const HomeNfts = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteNfts();
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const nfts = useMemo(() => {
    return data?.pages.flatMap((page) => page.nfts) || [];
  }, [data]);

  if (isFetching && !isFetchingNextPage) {
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
    <FlatListUi
      data={nfts}
      showLoadMore={hasNextPage}
      isRefetching={isFetchingNextPage}
      onLoadMore={fetchNextPage}
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
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ["nfts"] });
      }}
    />
  );
};

export default HomeNfts;
