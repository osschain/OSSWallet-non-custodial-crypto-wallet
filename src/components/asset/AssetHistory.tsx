import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, RefreshControl } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import HistoryItem, { variants } from "../history/history-item";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import BodyTextUi from "../ui/BodyTextUi";
import SpacerUi from "../ui/SpacerUi";

import { useAssets } from "@/app/api/assets";
import { useHistory } from "@/app/api/history";
import { findAsset } from "@/util/findAsset";

const AssetHistory = () => {
  const { assetSlug: slug } = useLocalSearchParams();
  const [page, setPage] = useState(10);
  const [pageToken, setPageToken] = useState<string | undefined>();

  const { data: assetManager } = useAssets();
  const queryClient = useQueryClient();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);
  const isToken = !!asset?.contractAddress;
  const { account, blockchain, id } = asset || {};

  const {
    data: history,
    isLoading,
    isError,
    isRefetching,
  } = useHistory({
    address: account?.address,
    id,
    blockchain,
    isToken,
    page,
    pageToken,
  });

  const { t } = useTranslation();
  const histories = history?.histories;
  const assetHistory = useMemo(() => {
    if (!histories) return;
    return histories?.filter(
      (history) => history.id.toLowerCase() === asset?.id.toLowerCase()
    );
  }, [asset?.id, histories]);
  if (isLoading) {
    return (
      <SpacerUi size="4xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (isError || !assetHistory?.length) {
    return <AlertWithImageUI title={t("wallet.home.asset.history-error")} />;
  }

  const handlePagination = () => {
    if (history?.nextPageToken) {
      setPageToken(history.nextPageToken);
      setPage((prev) => prev + 10);
    }
  };

  const checkAddres = (from: string | undefined): variants | undefined => {
    if (!assetManager || !from) return;

    try {
      const isFromMe = assetManager.addresses.find((adress) => {
        return adress.address.toLowerCase() === from.toLocaleLowerCase();
      });

      if (isFromMe) {
        return "send";
      } else if (!isFromMe) {
        return "recieved";
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
  return (
    <FlatList
      data={assetHistory}
      renderItem={({ item }) => (
        <>
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
        </>
      )}
      ListFooterComponent={() => (
        <>
          {history?.nextPageToken && (
            <SpacerUi style={{ paddingBottom: 20 }}>
              {isRefetching ? (
                <ActivityIndicator style={{ padding: 20 }} />
              ) : (
                <SpacerUi style={{ padding: 20 }}>
                  <TouchableOpacity onPress={handlePagination}>
                    <BodyTextUi
                      color="blue-500"
                      style={{ textAlign: "center" }}
                    >
                      {t("shared.loadMore")}
                    </BodyTextUi>
                  </TouchableOpacity>
                </SpacerUi>
              )}
            </SpacerUi>
          )}
        </>
      )}
      refreshControl={
        <RefreshControl
          onRefresh={async () => {
            await queryClient.invalidateQueries({ queryKey: ["history"] });
          }}
          refreshing={false}
        />
      }
    />
  );
};

export default AssetHistory;
