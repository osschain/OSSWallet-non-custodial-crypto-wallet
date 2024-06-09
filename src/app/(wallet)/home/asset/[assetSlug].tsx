import { Stack, useLocalSearchParams } from "expo-router";

import { useAssets } from "@/app/api/assets";
import AssetDetails from "@/components/asset/AssetDetail";
import AssetHistory from "@/components/asset/AssetHistory";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { findAsset } from "@/util/findAsset";

export default function Asset() {
  const { assetSlug: slug } = useLocalSearchParams();

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);

  if (!asset || !slug || typeof slug !== "string") {
    return (
      <ContainerUi>
        <SpacerUi size="3xl">
          <MessageUi>Something went wrong</MessageUi>
        </SpacerUi>
      </ContainerUi>
    );
  }

  return (
    <ContainerUi>
      <Stack.Screen options={{ title: asset.name }} />
      <SpacerUi size="4xl">
        <AssetDetails asset={asset} slug={slug} />
      </SpacerUi>
      <SpacerUi size="4xl" style={{ flex: 1 }}>
        <AssetHistory />
      </SpacerUi>
    </ContainerUi>
  );
}
