import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import AssetHistory from "@/components/asset/AssetHistory";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import {
  calculateBalance,
  calculateUsdBalance,
} from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function Asset() {
  const { assetSlug: slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: balances } = UseBalances();

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);

  if (!asset) {
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
      <Stack.Screen options={{ title: asset?.name }} />
      <SpacerUi size="4xl">
        <ChainDetails>
          <Image
            source={asset?.icon}
            style={{
              width: pixelToNumber(theme.sizes["4xl"]),
              height: pixelToNumber(theme.sizes["4xl"]),
            }}
          />
        </ChainDetails>
      </SpacerUi>
      <SpacerUi size="xl">
        <HeaderTextUi weight="semi" size="lg" style={{ textAlign: "center" }}>
          {calculateBalance(asset?.id, balances)} {asset.symbol}
        </HeaderTextUi>
        <BodyTextUi weight="regular" size="md" style={{ textAlign: "center" }}>
          {calculateUsdBalance(asset.id, balances)} $
        </BodyTextUi>
      </SpacerUi>
      <SpacerUi size="3xl">
        <Actions>
          <ActionButton>
            <Link href={`/(wallet)/home/send/${slug}`} asChild>
              <Button>
                <IconUi
                  library="Feather"
                  name="arrow-up-right"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>
            <BodyTextUi weight="bold">{t("shared.send")}</BodyTextUi>
          </ActionButton>
          <ActionButton>
            <Link href={`/(wallet)/home/recieve/${slug}`} asChild>
              <Button>
                <IconUi
                  library="Feather"
                  name="arrow-down-left"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>

            <BodyTextUi weight="bold">{t("shared.receive")}</BodyTextUi>
          </ActionButton>
          <ActionButton>
            <Link href={`/(wallet)/home/swap/${slug}`} asChild>
              <Button>
                <IconUi
                  library="AntDesign"
                  name="swap"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>

            <BodyTextUi weight="bold">{t("shared.swap")}</BodyTextUi>
          </ActionButton>
        </Actions>
      </SpacerUi>

      <SpacerUi size="4xl" style={{ flex: 1 }}>
        <AssetHistory />
      </SpacerUi>
    </ContainerUi>
  );
}

const ChainDetails = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
  justify-content: center;
  align-items: center;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["4xl"]};
`;

const ActionButton = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["lg"]};
`;

const Button = styled.TouchableOpacity`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
