import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import ItemUi from "../ui/ItemUi";
import SpacerUi from "../ui/SpacerUi";

import { useAssetPrices, useAssets } from "@/app/api/assets";
import {
  calculateBalance,
  calculateUsdBalance,
} from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";
import { UseBalances } from "@/app/api/balances";

const HomeAssets = () => {
  const theme = useTheme();
  const {
    data: assetManager,
    isError,
    isLoading: isAssetLoading,
  } = useAssets();
  const assets = assetManager?.assets;
  const { data: assetPrices } = useAssetPrices();
  const { data: balances, isLoading: isBalancesLoading } = UseBalances();
  const price = (symbol: string) =>
    assetPrices?.find((asset) => asset.symbol === symbol)?.price.toFixed(4) ||
    0;

  const change = (symbol: string) =>
    Number(
      assetPrices
        ?.find((asset) => asset.symbol === symbol)
        ?.price_change_24h.toFixed(2)
    ) || 0;

  if (isAssetLoading || isBalancesLoading) {
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
                      leftBottom={
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <BodyTextUi>{price(item.symbol)} $</BodyTextUi>
                          <BodyTextUi
                            size="sm"
                            style={{
                              color:
                                change(item.symbol) > 0
                                  ? theme.colors["green-700"]
                                  : theme.colors["red-700"],
                            }}
                          >
                            {change(item.symbol) > 0
                              ? "+" + change(item.symbol) + " %"
                              : change(item.symbol) + " %"}
                          </BodyTextUi>
                        </View>
                      }
                      descUri={
                        item.contractAddress
                          ? findAsset(assets, item.blockchain)?.icon
                          : undefined
                      }
                      right={
                        <View>
                          <BodyTextUi size="md" weight="medium">
                            {calculateBalance(item.id, balances)} {item.symbol}
                          </BodyTextUi>
                          <BodyTextUi
                            size="md"
                            weight="medium"
                            style={{ textAlign: "right" }}
                          >
                            {calculateUsdBalance(item.id, balances)} $
                          </BodyTextUi>
                        </View>
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
