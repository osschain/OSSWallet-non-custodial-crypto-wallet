import { Link, router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import AssetItem from "@/components/asset/AssetItem";
import NftItem from "@/components/nft/NftItem";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";
import {
  calculateBalance,
  calculateUsdBalance,
  totalBalance,
} from "@/services/balances.service";
import { nfts } from "@/util/mock";

type Segment = "Assets" | "NFTs";
const segmentOptions: Segment[] = ["Assets", "NFTs"];
export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");
  const { data: assets } = useAssets();
  const { data: balances, isLoading: isBalancesLoading } = UseBalances();
  const total = useMemo(() => {
    return totalBalance(balances);
  }, [balances]);

  const insets = useSafeAreaInsets();

  return (
    <Container style={{ paddingTop: insets.top }}>
      <Animated.View entering={FadeInRight.duration(300)} style={{ flex: 1 }}>
        <CardContainer>
          <WalletCard
            balance={total}
            onHistory={() => router.push("/(wallet)/home/history")}
            onRecieve={() => router.push("/(wallet)/home/recieve")}
            onSend={() => router.push("/(wallet)/home/send")}
            onCustomToken={() => router.push("(wallet)/home/custom-token")}
          />
        </CardContainer>
        <SpacerUi size="xl">
          <SegmentedControl
            options={segmentOptions}
            selectedOption="Assets"
            onOptionPress={(option) => {
              setSegment(option as Segment);
            }}
          />
        </SpacerUi>
        <AssetContainer>
          {isBalancesLoading && (
            <SpacerUi size="xl">
              <ActivityIndicator />
            </SpacerUi>
          )}
          {segment === "Assets" && !isBalancesLoading && (
            <FlatList
              data={assets}
              renderItem={({ item }) => (
                <>
                  {item.isShown && (
                    <Spacer>
                      <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                        <TouchableOpacity>
                          <AssetItem
                            uri={item.icon}
                            assetName={item.name}
                            symbol={item.symbol}
                            assetAmount={calculateBalance(item.id, balances)}
                            usdAmount={calculateUsdBalance(item.id, balances)}
                          />
                        </TouchableOpacity>
                      </Link>
                    </Spacer>
                  )}
                </>
              )}
            />
          )}
          {segment === "NFTs" && (
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
                  <Link href={`/(wallet)/home/nft/${item.id}`} asChild>
                    <TouchableOpacity>
                      <NftItem
                        title={item.title}
                        collection={item.collection}
                      />
                    </TouchableOpacity>
                  </Link>
                </SpacerUi>
              )}
            />
          )}
        </AssetContainer>
      </Animated.View>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  padding: ${({ theme }) => theme.spaces["lg"]}
    ${({ theme }) => theme.spaces["xl"]};
`;
const Spacer = styled.View`
  padding: ${({ theme }) => theme.spaces["lg"]} 0;
`;

const AssetContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
