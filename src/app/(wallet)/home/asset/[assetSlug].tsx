import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { useHistory } from "@/app/api/history";
import HistoryItem, { variants } from "@/components/history/history-item";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { getAdresses } from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function Asset() {
  const { assetSlug: slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();

  const { data: assets } = useAssets();
  const asset = findAsset(assets, slug as string);
  const { data: histories, isLoading } = useHistory(
    asset?.account.address,
    asset?.blockchain
  );

  console.log(histories);
  const checkAddres = (from: string): variants | undefined => {
    if (!assets) return;
    const adresses = getAdresses(assets);

    const isFromMe = adresses.find((adress) => {
      return adress.address.toLowerCase() === from.toLocaleLowerCase();
    });

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

      {isLoading && (
        <SpacerUi size="4xl">
          <ActivityIndicator />
        </SpacerUi>
      )}

      {!histories?.length && !isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AlertWithImageUI title="there is no history" />
        </View>
      )}

      <SpacerUi size="4xl" style={{ flex: histories?.length ? 1 : 0 }}>
        <FlatList
          data={histories}
          keyExtractor={(item) => item.transactionIndex}
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom">
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
