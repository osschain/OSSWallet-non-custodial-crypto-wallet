import { useState } from "react";
import { ScrollView } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import AssetItem from "@/components/asset/AssetItem";
import HistoryItem from "@/components/history/history-item";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";

type Segment = "Assets" | "NFT";

const segmentOptions: Segment[] = ["Assets", "NFT"];

export default function Home() {
  const [segment, setSegment] = useState<Segment>("NFT");

  return (
    <ScrollView>
      <Animated.View entering={FadeInRight.duration(300)}>
        <Container>
          <WalletCard />
        </Container>
        <SpacerUi size="3xl">
          <SegmentedControl
            options={segmentOptions}
            selectedOption="Assets"
            onOptionPress={(option) => {
              setSegment(option as Segment);
            }}
          />
        </SpacerUi>
        <Container>
          <SpacerUi size="3xl">
            {segment === "Assets" && <AssetItem />}
            {segment === "NFT" && <HistoryItem />}
          </SpacerUi>
        </Container>
      </Animated.View>
    </ScrollView>
  );
}

const Container = styled.View`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
