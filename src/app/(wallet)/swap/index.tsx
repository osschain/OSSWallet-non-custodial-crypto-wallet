import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import AssetOptions from "@/components/asset/AssetOptions";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function Swap() {
  const [exchangable, setExchangable] = useState<AssetType | null>(null);
  const [target, setTarget] = useState<AssetType | null>(null);
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const { t } = useTranslation();
  const exchangableOptions = useRef<BottomSheetModal>(null);
  const targetOptions = useRef<BottomSheetModal>(null);

  const handleExchangableOptionsPress = () => {
    exchangableOptions.current?.present();
  };

  const handleTargetOptionsPress = () => {
    targetOptions.current?.present();
  };

  if (!assets) {
    return;
  }

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
          <HeaderTextUi>{t("wallet.swap.index.from")}</HeaderTextUi>
          <SpacerUi size="lg">
            <AssetQuantityInputUi
              placeholder={t("wallet.swap.index.to-address-placeholder")}
              uri={exchangable?.icon}
              title={exchangable?.name}
              onAssetPress={handleExchangableOptionsPress}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <HeaderTextUi>{t("wallet.swap.index.to")}</HeaderTextUi>
            <SpacerUi size="lg">
              <AssetQuantityInputUi
                uri={target?.icon}
                title={target?.name}
                placeholder={t("wallet.swap.index.from-address-placeholder")}
                onAssetPress={handleTargetOptionsPress}
              />
            </SpacerUi>
          </SpacerUi>
        </SpacerUi>
      </BodyUi>

      <FooterUi marginSize="sm">
        <ButtonUi
          variant="primary"
          onPress={() => router.replace("(wallet)/swap/swap-in-progress")}
        >
          {t("shared.swap")}
        </ButtonUi>
      </FooterUi>
    </ContainerUi>
  );
}
