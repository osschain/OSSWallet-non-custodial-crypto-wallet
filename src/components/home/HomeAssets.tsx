import { Link } from "expo-router";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import ItemUi from "../ui/ItemUi";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { calculateBalance } from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";
import SpacerUi from "../ui/SpacerUi";

const HomeAssets = () => {
  const { data: balances, isLoading: isbalanceLoading } = UseBalances();
  const {
    data: assetManager,
    isError,
    isLoading: isAssetLoading,
  } = useAssets();
  const assets = assetManager?.assets;

  if (isAssetLoading || isbalanceLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (!assets?.length || isError) {
    return <AlertWithImageUI title="Can't find NFTS" />;
  }

  return (
    <FlatList
      data={assets}
      renderItem={({ item }) => (
        <>
          {item.isShown && (
            <Spacer>
              <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                <TouchableOpacity>
                  <Asset>
                    <ItemUi
                      title={item.name}
                      uri={item.icon}
                      description={`${calculateBalance(item.id, balances)} ${item.symbol}`}
                      descUri={
                        item.contractAddress
                          ? findAsset(assets, item.blockchain)?.icon
                          : undefined
                      }
                      right={
                        <BodyTextUi size="md" weight="medium">
                          {calculateBalance(item.id, balances)} $
                        </BodyTextUi>
                      }
                    />
                  </Asset>
                </TouchableOpacity>
              </Link>
            </Spacer>
          )}
        </>
      )}
    />
  );
};

const Spacer = styled.View`
  padding: ${({ theme }) => theme.spaces["lg"]} 0;
`;

const Asset = styled.View`
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

export default HomeAssets;
