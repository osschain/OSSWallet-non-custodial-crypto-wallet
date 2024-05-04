import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import styled from "styled-components/native";

import AssetItem from "@/components/asset/AssetItem";
import HistoryItem from "@/components/history/history-item";
import SegmentedControl from "@/components/segment";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import WalletCard from "@/components/wallet/wallet-card";

type Segment = "Assets" | "History";

const segmentOptions: Segment[] = ["Assets", "History"];

export default function Home() {
  const [segment, setSegment] = useState<Segment>("History");

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
            {segment === "History" && <HistoryItem />}
          </SpacerUi>
          <SpacerUi size="3xl">
            <HeaderTextUi>Custom Token</HeaderTextUi>
            <SpacerUi size="xl" />
            <MessageUi>
              You can always add custom tokens to our wallet to manage them.
            </MessageUi>
            <SpacerUi size="2xl" />
            <Link href="/(wallet)/home" asChild>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <BodyTextUi
                  weight="medium"
                  style={{ textAlign: "center", textAlignVertical: "center" }}
                >
                  Manage Tokens
                </BodyTextUi>
                <AntDesign name="swap" size={24} />
              </TouchableOpacity>
            </Link>
          </SpacerUi>
        </Container>
      </Animated.View>
    </ScrollView>
  );
}

const Container = styled.View`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
