import { Image } from "expo-image";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { useHistory } from "@/app/api/history";
import HistoryItem, { variants } from "@/components/history/history-item";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import {
  calculateBalance,
  calculateUsdBalance,
  getAdresses,
} from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";
import { pixelToNumber } from "@/util/pixelToNumber";
import HeaderTextUi from "@/components/ui/HeaderTextUi";

export default function Asset() {
  const [page, setPage] = useState(100);

  const { assetSlug: slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: balances } = UseBalances();

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);
  const {
    data: histories,
    isLoading,
    isError,
    isRefetching,
  } = useHistory(
    asset?.account.address,
    asset?.id as string,
    asset?.blockchain,
    !!asset?.contractAddress,
    page
  );

  const filterHistories = useMemo(() => {
    return histories?.filter(
      (history) => history.id.toLowerCase() === asset?.id.toLowerCase()
    );
  }, [asset?.id, histories]);

  const checkAddres = (from: string | undefined): variants | undefined => {
    if (!assets || !from) return;
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

  if (isError || !asset) {
    return (
      <ContainerUi>
        <SpacerUi size="3xl">
          <MessageUi>Something went wrong</MessageUi>
        </SpacerUi>
      </ContainerUi>
    );
  }

  const handlePagination = () => {
    if (!histories) return;

    if (histories[histories?.length - 1].nextPageToken) {
      setPage((prev) => prev + 100);
    } else {
      Alert.alert("...ops", "There is no more histories");
    }
  };

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
          data={filterHistories}
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `/(wallet)/home/history/${item.id}`,
                    params: item,
                  })
                }
              >
                <HistoryItem
                  walletAddress={item.from}
                  variant={checkAddres(item.from)}
                  amount={item.value}
                />
              </TouchableOpacity>
            </SpacerUi>
          )}
          ListFooterComponent={() => (
            <>
              {!isLoading && !!histories?.length && (
                <SpacerUi style={{ padding: 20 }}>
                  <TouchableOpacity onPress={handlePagination}>
                    <BodyTextUi
                      color="blue-500"
                      style={{ textAlign: "center" }}
                    >
                      Load More
                    </BodyTextUi>
                  </TouchableOpacity>
                </SpacerUi>
              )}
              {isRefetching && <ActivityIndicator />}
            </>
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
