import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import NftItem from "../nft/NftItem";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import SpacerUi from "../ui/SpacerUi";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { useNfts } from "@/app/api/nft";
import { findAsset } from "@/util/findAsset";

const HomeNfts = () => {
  const { data: nfts, isError, isLoading: isNftLoading } = useNfts(10);
  const { data: assetManager } = useAssets();
  const { isLoading: isBalanceLoading } = UseBalances();
  const assets = assetManager?.assets;

  if (isNftLoading || isBalanceLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (!nfts?.length || isError) {
    return <AlertWithImageUI title="Can't find NFTS" />;
  }

  return (
    <FlatList
      data={nfts}
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
    />
  );
};

export default HomeNfts;