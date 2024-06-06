import { Link, router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
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
import {
  calculateBalance,
  calculateUsdBalance,
  totalBalance,
} from "@/services/balances.service";
import { nfts } from "@/util/mock";

type Segment = "Assets" | "NFTS";
const segmentOptions: Segment[] = ["Assets", "NFTS"];
export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");
  const { data: assets } = useAssets();
  const { data: balances, isLoading: isBalancesLoading } = UseBalances();
  const total = useMemo(() => {
    return totalBalance(balances);
  }, [balances]);

  return (
    <Animated.View entering={FadeInRight.duration(300)} style={{ flex: 1 }}>
      <CardContainer>
        <WalletCard
          balance={total}
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
                  <SpacerUi size="xl" position="bottom">
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
                  </SpacerUi>
                )}
              </>
            )}
          />
        )}
        {segment === "NFTS" && (
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
