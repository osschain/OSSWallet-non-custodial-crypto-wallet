import { Link, router } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import AssetItem from "@/components/asset/AssetItem";
import NftItem from "@/components/nft/NftItem";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";
import { nfts } from "@/util/mock";

type Segment = "Assets" | "NFT";
const segmentOptions: Segment[] = ["Assets", "NFT"];
export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");
  const { data: assets } = useAssets();

  const { data: balances } = UseBalances();

  const totalBalance = () => {
    const balance = balances?.reduce((prev, current) => {
      return Number(current.balance) + prev;
    }, 0);

    if (balance === 0) return balance;

    return Number(balance?.toFixed(1));
  };

  const calculateBalance = (id: string) => {
    const balance = Number(
      balances?.find((balance) => id === balance.id)?.balance || 0
    );

    return Number(balance.toFixed(3));
  };

  const calculateUsdBalance = (id: string) => {
    const balance = Number(
      balances?.find((balance) => id === balance.id)?.balanceUsd || 0
    );

    return Number(balance.toFixed(1));
  };

  return (
    <Animated.View entering={FadeInRight.duration(300)} style={{ flex: 1 }}>
      <CardContainer>
        <WalletCard
          balance={totalBalance()}
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
              <>
                {item.isShown && (
                  <SpacerUi size="xl" position="bottom">
                    <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                      <TouchableOpacity>
                        <AssetItem
                          uri={item.icon}
                          assetName={item.name}
                          assetAmount={calculateBalance(item.id)}
                          usdAmount={calculateUsdBalance(item.id)}
                        />
                      </TouchableOpacity>
                    </Link>
                  </SpacerUi>
                )}
              </>
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
