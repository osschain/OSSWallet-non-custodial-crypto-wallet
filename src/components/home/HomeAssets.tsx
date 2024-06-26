import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import ItemUi from "../ui/ItemUi";
import SpacerUi from "../ui/SpacerUi";

import { AssetType } from "@/@types/assets";
import { useAssetPrices, useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import {
  calculateBalance,
  calculateUsdBalance,
} from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";

const HomeAssets = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    data: assetManager,
    isError,
    isLoading: isAssetLoading,
  } = useAssets();
  const assets = assetManager?.assets;

  if (isAssetLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (!assets?.length || isError) {
    return (
      <AlertWithImageUI title={t("wallet.home.index.asset-allert-error")} />
    );
  }

  return (
    <FlatList
      data={assets}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <>
          {item.isShown && (
            <Spacer
              style={{
                marginTop: index === 0 ? 14 : 7,
                marginBottom: assets.length - 1 === index ? 14 : 7,
              }}
            >
              <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                <TouchableOpacity>
                  <AssetItem
                    item={item}
                    networkUri={
                      item.contractAddress
                        ? findAsset(assets, item.blockchain)?.icon
                        : undefined
                    }
                  />
                </TouchableOpacity>
              </Link>
            </Spacer>
          )}
        </>
      )}
      refreshControl={
        <RefreshControl
          onRefresh={async () => {
            await queryClient.invalidateQueries({ queryKey: ["balances"] });
            await queryClient.invalidateQueries({ queryKey: ["assetPrices"] });
          }}
          refreshing={false}
        />
      }
    />
  );
};

const AssetItem = ({
  item,
  networkUri,
}: {
  item: AssetType;
  networkUri?: string;
}) => {
  const { data: assetPrices } = useAssetPrices();
  const { data: balances } = UseBalances();

  const theme = useTheme();
  const price = (symbol: string) =>
    assetPrices
      ?.find(
        (asset) =>
          asset.symbol === item.symbol ||
          (asset.symbol === "MATIC" && item.symbol === "zkEVM")
      )
      ?.price.toFixed(4) || 0;

  const priceChange = (symbol: string) =>
    Number(
      assetPrices
        ?.find((asset) => {
          return (
            asset.symbol === item.symbol ||
            (asset.symbol === "MATIC" && item.symbol === "zkEVM")
          );
        })
        ?.price_change_24h.toFixed(2)
    ) || 0;

  return (
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
                  priceChange(item.symbol) > 0
                    ? theme.colors["green-700"]
                    : theme.colors["red-700"],
              }}
            >
              {priceChange(item.symbol) > 0
                ? "+" + priceChange(item.symbol) + " %"
                : priceChange(item.symbol) + " %"}
            </BodyTextUi>
          </View>
        }
        descUri={networkUri}
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
  );
};

const Spacer = styled.View``;

const Asset = styled.View`
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

export default HomeAssets;
