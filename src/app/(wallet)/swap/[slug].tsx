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
import SpacerUi from "@/components/ui/SpacerUi";
import { findAsset } from "@/util/findAsset";

export default function Swap() {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams();
  const { data: assetManager, isError } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);

  const fromAsseet = useRef<BottomSheetModal>(null);
  const toAsset = useRef<BottomSheetModal>(null);

  const [from, setFrom] = useState<AssetType | null>(asset || null);
  const [to, setTo] = useState<AssetType | null>(null);

  if (isError || !asset) {
    // return (
    //   <ContainerUi>
    //     <SpacerUi>
    //       <MessageUi> t("shared.asset-error")</MessageUi>
    //     </SpacerUi>
    //   </ContainerUi>
    // );
  }

  return (
    <ScrollContainerUi>
      <Stack.Screen
        options={{ title: `${t("shared.swap")} ${asset?.name || ""} ` }}
      />

      {!asset && (
        <AssetOptions
          assets={assets as AssetType[]}
          ref={fromAsseet}
          onSelect={(asset) => {
            setFrom(asset);
            fromAsseet.current?.close();
          }}
        />
      )}

      <AssetOptions
        assets={assets as AssetType[]}
        ref={toAsset}
        onSelect={(asset) => {
          setTo(asset);
          toAsset.current?.close();
        }}
      />

      <BodyUi>
        <SpacerUi size="2xl">
          <HeaderTextUi>From</HeaderTextUi>
          <SpacerUi size="lg">
            <AssetQuantityInputUi
              placeholder={t("wallet.home.swap.addres-input-placeholder")}
              uri={from?.icon}
              title={from?.name}
              onAssetPress={() => {
                if (asset) return;
                fromAsseet.current?.present();
              }}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <HeaderTextUi>To</HeaderTextUi>
          <SpacerUi size="lg">
            <AssetQuantityInputUi
              uri={to?.icon}
              title={to?.name}
              placeholder={t("wallet.home.swap.addres-input-placeholder")}
              onAssetPress={() => toAsset.current?.present()}
            />
          </SpacerUi>
        </SpacerUi>
      </BodyUi>

      <FooterUi marginSize="sm">
        <ButtonUi
          variant="primary"
          onPress={() => router.replace("/(wallet)/swap/swap-in-progress")}
        >
          {t("shared.swap")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}
