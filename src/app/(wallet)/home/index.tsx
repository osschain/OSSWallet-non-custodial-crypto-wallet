import { Link, router } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import AssetItem from "@/components/asset/AssetItem";
import NftItem from "@/components/nft/NftItem";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";
import { assets, nfts } from "@/util/mock";

type Segment = "Assets" | "NFT";

const segmentOptions: Segment[] = ["Assets", "NFT"];

export default function Home() {
  const [segment, setSegment] = useState<Segment>("Assets");

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
      <SpacerUi size="xl" style={{ flex: 1 }}>
        <AssetContainer>
          {segment === "Assets" && (
            <FlatList
              data={assets}
              renderItem={({ item }) => (
                <SpacerUi size="xl" position="bottom">
                  <Link href={`/(wallet)/home/asset/${item.id}`} asChild>
                    <TouchableOpacity>
                      <AssetItem assetName={item.title} />
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
              columnWrapperStyle={{ gap: 10 }}
              renderItem={({ item }) => (
                <SpacerUi size="xl" position="bottom">
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
      </SpacerUi>
    </Animated.View>
  );
}

const CardContainer = styled.View`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const AssetContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
