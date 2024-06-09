import { Link, router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { useNfts } from "@/app/api/nft";
import NftItem from "@/components/nft/NftItem";
import SegmentedControl from "@/components/segment";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ItemUi from "@/components/ui/ItemUi";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";
import {
  calculateBalance,
  calculateUsdBalance,
  totalBalance,
} from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";

type Segment = "Assets" | "NFTs";
const segmentOptions: Segment[] = ["Assets", "NFTs"];
export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");
  const [page, setPage] = useState(10);

  const { data: assets } = useAssets();
  const { data: nfts } = useNfts(page);
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
                                  {calculateUsdBalance(item.id, balances)} $
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

const Asset = styled.View`
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;
