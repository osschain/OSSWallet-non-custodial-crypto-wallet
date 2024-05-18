import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Image } from "react-native";
import styled, { useTheme } from "styled-components/native";

import HistoryItem from "@/components/history/history-item";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAsset } from "@/providers/AssetProvider";
import { defaultImage } from "@/util/DefaultImage";
import { history } from "@/util/mock";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function Asset() {
  const { assetSlug: slug } = useLocalSearchParams();
  const theme = useTheme();
  const { assets } = useAsset();
  const asset = assets?.find((asset) => asset.id === slug);
  const { t } = useTranslation();
  return (
    <ContainerUi>
      <Stack.Screen options={{ title: asset?.name }} />

      <SpacerUi size="4xl">
        <ChainDetails>
          <Image
            source={{ uri: asset?.icon }}
            width={pixelToNumber(theme.sizes["3xl"])}
            height={pixelToNumber(theme.sizes["3xl"])}
          />
          <BodyTextUi weight="bold" size="lg">
            {asset?.name} {t("shared.token")}
          </BodyTextUi>
        </ChainDetails>
      </SpacerUi>
      <SpacerUi size="4xl">
        <Actions>
          <ActionButton>
            <Link href={`(wallet)/home/send/${slug}`} asChild>
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
            <Link href={`(wallet)/home/recieve/${slug}`} asChild>
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
            <Link href={`(wallet)/home/swap/${slug}`} asChild>
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
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom" key={item.id}>
              <HistoryItem
                walletAddress={item.walletAddress}
                variant={item.send ? "send" : "recieved"}
                amount={item.send ? item.send : item.recieved}
              />
            </SpacerUi>
          )}
        />
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
