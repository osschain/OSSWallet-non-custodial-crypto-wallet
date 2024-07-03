import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import FlatListUi from "../ui/FlatListUi";
import ItemUi from "../ui/ItemUi";
import SpacerUi from "../ui/SpacerUi";

import { AssetType } from "@/@types/assets";
import { useAssetPrices, useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { useStore } from "@/providers/StoreProvider";
import { findAsset } from "@/util/findAsset";
import { useEffect } from "react";

const HomeAssets = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    data: assetManager,
    isError,
    isLoading: isAssetLoading,
  } = useAssets();
  const assets = assetManager?.assets;
  const { data: assetPrices } = useAssetPrices();
  const { resetTotalBalance } = useStore();

  const price = (symbol: string) =>
    Number(
      assetPrices
        ?.find(
          (asset) =>
            asset.symbol === symbol ||
            (asset.symbol === "MATIC" && symbol === "zkEVM")
        )
        ?.price.toFixed(4)
    ) || 0;

  const priceChange = (symbol: string) =>
    Number(
      assetPrices
        ?.find((asset) => {
          return (
            asset.symbol === symbol ||
            (asset.symbol === "MATIC" && symbol === "zkEVM")
          );
        })
        ?.price_change_24h.toFixed(2)
    ) || 0;

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
    <FlatListUi
      data={assets}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <>
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
                  prPrice={price(item.symbol)}
                  priceChange={priceChange(item.symbol)}
                  networkUri={
                    item.contractAddress
                      ? findAsset(assets, item.blockchain)?.icon
                      : undefined
                  }
                />
              </TouchableOpacity>
            </Link>
          </Spacer>
        </>
      )}
      onRefresh={async () => {
        resetTotalBalance();
        await queryClient.invalidateQueries({ queryKey: ["balances"] });
      }}
    />
  );
};

const AssetItem = ({
  item,
  networkUri,
  priceChange,
  prPrice,
}: {
  item: AssetType;
  networkUri?: string;
  priceChange: number;
  prPrice: number;
}) => {
  const { data: balances, isLoading } = UseBalances(item);
  const { updateTotalBalance } = useStore();
  console.log(balances);
  const balance = balances?.balance;
  const price = balances?.price.toFixed(6);
  const theme = useTheme();

  useEffect(() => {
    if (balance && price) {
      updateTotalBalance(Number(balance) * price);
    }
  }, [balance, price, updateTotalBalance]);

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
            <BodyTextUi>{prPrice} $</BodyTextUi>
            <BodyTextUi
              size="sm"
              style={{
                color:
                  priceChange > 0
                    ? theme.colors["green-700"]
                    : theme.colors["red-700"],
              }}
            >
              {priceChange > 0 ? "+" + priceChange + " %" : priceChange + " %"}
            </BodyTextUi>
          </View>
        }
        descUri={networkUri}
        right={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <BodyTextUi
                style={{ textAlign: "right" }}
                size="md"
                weight="medium"
              >
                {balance || 0}
              </BodyTextUi>
              <BodyTextUi
                size="md"
                weight="medium"
                style={{ textAlign: "right" }}
              >
                {balance ? (Number(balance) * price).toFixed(3) : 0} $
              </BodyTextUi>
            </View>
          )
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
