import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import AssetOptions from "@/components/asset/AssetOptions";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { Asset, assets } from "@/util/mock";

export default function Swap() {
  const [exchangable, setExchangable] = useState<Asset | null>(null);
  const [target, setTarget] = useState<Asset | null>(null);

  const exchangableOptions = useRef<BottomSheetModal>(null);
  const targetOptions = useRef<BottomSheetModal>(null);

  const handleExchangableOptionsPress = () => {
    exchangableOptions.current?.present();
  };

  const handleTargetOptionsPress = () => {
    targetOptions.current?.present();
  };

  return (
    <Container>
      <AssetOptions
        assets={assets}
        ref={exchangableOptions}
        onSelect={(asset) => {
          setExchangable(asset);
          exchangableOptions.current?.close();
        }}
      />
      <AssetOptions
        assets={assets}
        ref={targetOptions}
        onSelect={(asset) => {
          setTarget(asset);
          targetOptions.current?.close();
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Body>
          <SpacerUi size="2xl">
            <HeaderTextUi>From</HeaderTextUi>
            <SpacerUi size="lg">
              <AssetQuantityInputUi
                placeholder="Enter Adress"
                uri={exchangable?.image}
                title={exchangable?.title}
                onAssetPress={handleExchangableOptionsPress}
              />
            </SpacerUi>
          </SpacerUi>
          <SpacerUi size="2xl">
            <SpacerUi size="lg">
              <HeaderTextUi>To</HeaderTextUi>
              <SpacerUi size="lg">
                <AssetQuantityInputUi
                  uri={target?.image}
                  title={target?.title}
                  placeholder="Enter Adress"
                  onAssetPress={handleTargetOptionsPress}
                />
              </SpacerUi>
            </SpacerUi>
          </SpacerUi>
        </Body>

        <Footer>
          <Button
            variant="primary"
            onPress={() => router.replace("/(wallet)/swap/swap-in-progress")}
          >
            Swap
          </Button>
        </Footer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Body = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["2xl"]} 0;

  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Button = styled(ButtonUi)``;
