import { useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import FlatListUi from "../ui/FlatListUi";
import ItemUi from "../ui/ItemUi";
import SpacerUi from "../ui/SpacerUi";

import { AssetType } from "@/@types/assets";
import { BalancesType } from "@/@types/balances";
import { useAssetPrices, useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
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
  const { data: assetPrices } = useAssetPrices();
  const { data: balancesManager, isLoading: isBalancesLoading } = UseBalances();

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
          {item.isShown ? (
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
                    price={price(item.symbol)}
                    isBalancesLoading={isBalancesLoading}
                    priceChange={priceChange(item.symbol)}
                    balance={balancesManager?.findbalance(item.id)}
                    networkUri={
                      item.contractAddress
                        ? findAsset(assets, item.blockchain)?.icon
                        : undefined
                    }
                  />
                </TouchableOpacity>
              </Link>
            </Spacer>
          ) : null}
        </>
      )}
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ["assetPrices"] });
      }}
    />
  );
};

const AssetItem = ({
  item,
  networkUri,
  priceChange,
  price,
  balance,
  isBalancesLoading,
}: {
  item: AssetType;
  isBalancesLoading: boolean;
  networkUri?: string;
  priceChange: number;
  balance: BalancesType | undefined;
  price: number;
}) => {
  const theme = useTheme();

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
            <BodyTextUi>{price} $</BodyTextUi>
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
          isBalancesLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <BodyTextUi
                style={{ textAlign: "right" }}
                size="md"
                weight="medium"
              >
                {balance?.balance || 0}
              </BodyTextUi>
              <BodyTextUi
                size="md"
                weight="medium"
                style={{ textAlign: "right" }}
              >
                {balance?.balanceUsd || 0} $
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
