import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import AssetOptions from "@/components/asset/AssetOptions";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { Asset, assets } from "@/util/mock";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";

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
    <ContainerUi>
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
      <BodyUi>
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
      </BodyUi>

      <FooterUi marginSize="sm">
        <Button
          variant="primary"
          onPress={() => router.replace("(wallet)/swap/swap-in-progress")}
        >
          Swap
        </Button>
      </FooterUi>
    </ContainerUi>
  );
}

const Button = styled(ButtonUi)``;
