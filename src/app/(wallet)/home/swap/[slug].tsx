import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import AssetOptions from "@/components/asset/AssetOptions";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { findAsset } from "@/util/findAsset";

export default function Swap() {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams();
  const { data: assets } = useAssets();
  const asset = findAsset(assets, slug as string);
  const [target, setTarget] = useState<AssetType | null>(null);
  const targetOptions = useRef<BottomSheetModal>(null);

  const handleTargetOptionsPress = () => {
    targetOptions.current?.present();
  };

  if (!assets || !asset) {
    return (
      <SpacerUi>
        <MessageUi> t("shared.asset-error")</MessageUi>
      </SpacerUi>
    );
  }

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `Swap ${asset?.name} ` }} />

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
              uri={asset?.icon}
              title={asset?.name}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <HeaderTextUi>To</HeaderTextUi>
            <SpacerUi size="lg">
              <AssetQuantityInputUi
                uri={target?.icon}
                title={target?.name}
                placeholder="Enter Adress"
                onAssetPress={handleTargetOptionsPress}
              />
            </SpacerUi>
          </SpacerUi>
        </SpacerUi>
      </BodyUi>

      <FooterUi marginSize="sm">
        <ButtonUi
          variant="primary"
          onPress={() => router.replace("/(wallet)/home/swap/swap-in-progress")}
        >
          {t("shared.swap")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}
