import { router } from "expo-router";
import { useState } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { BalancesType } from "@/@types/balances";
import { UseBalances } from "@/app/api/balances";
import HomeAssets from "@/components/home/HomeAssets";
import HomeCard from "@/components/home/HomeCard";
import HomeNfts from "@/components/home/HomeNfts";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";

type Segment = "Assets" | "NFTs";
const segmentOptions: Segment[] = ["Assets", "NFTs"];
export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <Container style={{ paddingTop: insets.top }}>
      <Animated.View entering={FadeInRight.duration(300)} style={{ flex: 1 }}>
        <CardContainer>
          <HomeCard
            onHistory={() => router.push("/(wallet)/home/history")}
            onRecieve={() => router.push("/(wallet)/home/recieve")}
            onSend={() => router.push("/(wallet)/home/send")}
            onCustomToken={() => router.push("(wallet)/home/custom-token")}
            onNotification={() => {}}
          />
        </CardContainer>
        <SpacerUi size="xl" style={{ flex: 1 }}>
          <HomeSegment />
        </SpacerUi>
      </Animated.View>
    </Container>
  );
}

const HomeSegment = () => {
  const [segment, setSegment] = useState<Segment>("Assets");

  return (
    <>
      <SegmentedControl
        options={segmentOptions}
        selectedOption="Assets"
        onOptionPress={(option) => {
          setSegment(option as Segment);
        }}
      />
      <SegmentContainer>
        {segment === "Assets" && <HomeAssets />}
        {segment === "NFTs" && <HomeNfts />}
      </SegmentContainer>
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

const CardContainer = styled.View`
  padding: ${({ theme }) => theme.spaces["lg"]}
    ${({ theme }) => theme.spaces["xl"]};
`;

const SegmentContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
