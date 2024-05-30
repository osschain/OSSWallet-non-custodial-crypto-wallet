import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import HistoryItem, { variants } from "@/components/history/history-item";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAssetHistory } from "@/providers/AssetHistoryProvider";
import { useAsset } from "@/providers/AssetProvider";
import { getAdresses } from "@/services/balances.service";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function Asset() {
  const { assetSlug: slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const { assets } = useAsset();
  const { cashedHistory, fetchHistory, loading } = useAssetHistory();

  const asset = assets?.find((asset) => asset.name === slug);

  useEffect(() => {
    const bootstrap = () => {
      if (!histories && asset) {
        fetchHistory(asset.account.address, asset["ankr-endpoint"]);
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  const histories = cashedHistory[asset?.["ankr-endpoint"] || ""];

  const checkAddres = (from: string): variants | undefined => {
    if (!assets) return;
    const adresses = getAdresses(assets);
    const isFromMe = adresses.find((adress) => adress.address === from);

    if (isFromMe) {
      return "send";
    } else if (!isFromMe) {
      return "recieved";
    }
  };

  if (!asset) {
    return (
      <SpacerUi size="3xl">
        <MessageUi>Something went wrong</MessageUi>
      </SpacerUi>
    );
  }

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
            {asset?.name}
          </BodyTextUi>
        </ChainDetails>
      </SpacerUi>
      <SpacerUi size="4xl">
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

      {loading && (
        <SpacerUi size="4xl">
          <ActivityIndicator />
        </SpacerUi>
      )}

      {!histories?.length && !loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AlertWithImageUI title="there is no history" />
        </View>
      )}

      <SpacerUi size="4xl" style={{ flex: histories?.length ? 1 : 0 }}>
        <FlatList
          data={histories}
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom" key={item.value}>
              <HistoryItem
                walletAddress={item.from}
                variant={checkAddres(item.from)}
                amount={item.value}
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
