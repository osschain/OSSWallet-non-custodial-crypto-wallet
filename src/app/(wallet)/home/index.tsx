import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import HomeAssets from "@/components/home/HomeAssets";
import HomeCard from "@/components/home/HomeCard";
import HomeNfts from "@/components/home/HomeNfts";
import SegmentedControl from "@/components/segment";
import SpacerUi from "@/components/ui/SpacerUi";
import { UseBalances } from "@/app/api/balances";

type Segment = "Assets" | "NFTs";
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
          />
        </CardContainer>
        <SpacerUi size="sm" fullHeight>
          <HomeSegment />
        </SpacerUi>
      </Animated.View>
    </Container>
  );
}

const HomeSegment = () => {
  const [segment, setSegment] = useState<Segment>("Assets");
  const { t } = useTranslation();

  const segmentOptions = useMemo((): Segment[] => {
    return [t("shared.assets"), "NFTs"];
  }, [t]);

  return (
    <>
      <SegmentedControl
        options={segmentOptions}
        selectedOption={t("shared.assets")}
        onOptionPress={(option) => {
          setSegment(option as Segment);
        }}
      />
      <SegmentContainer>
        <View style={{ display: segment !== "NFTs" ? "flex" : "none" }}>
          <HomeAssets />
        </View>
        <View
          style={{ display: segment === "NFTs" ? "flex" : "none", flex: 1 }}
        >
          <HomeNfts />
        </View>
      </SegmentContainer>
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

// prettier-ignore
const CardContainer = styled.View`
  padding: ${({ theme }) => theme.spaces["lg"]} ${({ theme }) => theme.spaces["xl"]};
`;

const SegmentContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
