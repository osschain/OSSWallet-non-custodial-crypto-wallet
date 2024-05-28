import { Keypair } from "@solana/web3.js";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import AssetItem from "@/components/asset/AssetItem";
import NftItem from "@/components/nft/NftItem";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";
import { useAssetBalance } from "@/providers/AssetBalanceProvider";
import { useAsset } from "@/providers/AssetProvider";
import { nfts } from "@/util/mock";

type Segment = "Assets" | "NFT";
const segmentOptions: Segment[] = ["Assets", "NFT"];
export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");
  const { assets } = useAsset();
  const { balances } = useAssetBalance();
  const calculateBalance = (assetSymbol: string) => {
    return Number(
      balances?.find((balance) => assetSymbol === balance.symbol)?.balance || 0
    );
  };

  const calculateUsdBalance = (assetSymbol: string) => {
    return Number(
      balances?.find((balance) => assetSymbol === balance.symbol)?.balanceUsd ||
        0
    );
  };

  return (
    <Animated.View entering={FadeInRight.duration(300)} style={{ flex: 1 }}>
      <CardContainer>
        <WalletCard
          onHistory={() => router.push("/(wallet)/home/history")}
          onRecieve={() => router.push("/(wallet)/home/recieve")}
          onSend={() => router.push("/(wallet)/home/send")}
        />
      </CardContainer>
      <SpacerUi size="3xl">
        <SegmentedControl
          options={segmentOptions}
          selectedOption="Assets"
          onOptionPress={(option) => {
            setSegment(option as Segment);
          }}
        />
      </SpacerUi>
      <AssetContainer>
        {segment === "Assets" && (
          <FlatList
            data={assets}
            renderItem={({ item }) => (
              <SpacerUi size="xl" position="bottom">
                <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                  <TouchableOpacity>
                    <AssetItem
                      uri={item.icon}
                      assetName={item.name}
                      assetAmount={calculateBalance(item.symbol)}
                      usdAmount={calculateUsdBalance(item.symbol)}
                    />
                  </TouchableOpacity>
                </Link>
              </SpacerUi>
            )}
          />
        )}
        {segment === "NFT" && (
          <FlatList
            data={nfts}
            key={2}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
            contentContainerStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <SpacerUi style={{ width: "48%" }} size="xl" position="bottom">
                <Link href={`/(wallet)/home/nft/${item.id}`} asChild>
                  <TouchableOpacity>
                    <NftItem title={item.title} collection={item.collection} />
                  </TouchableOpacity>
                </Link>
              </SpacerUi>
            )}
          />
        )}
      </AssetContainer>
    </Animated.View>
  );
}

const CardContainer = styled.View`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const AssetContainer = styled.View`
  flex: 1;
  margin-top: ${({ theme }) => theme.spaces["xl"]};
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
