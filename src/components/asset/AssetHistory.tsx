import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert } from "react-native";
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
  const [page, setPage] = useState(20);
  const { data: assetManager } = useAssets();

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

  if (isError || !histories?.length) {
    return <AlertWithImageUI title={t("wallet.home.asset.history-error")} />;
  }

  const handlePagination = () => {
    if (!histories) return;

    if (history.nextPageToken) {
      setPage((prev) => prev + 20);
    } else {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.asset.more-history-error")
      );
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
                <BodyTextUi color="blue-500" style={{ textAlign: "center" }}>
                  {t("shared.loadMore")}
                </BodyTextUi>
              </TouchableOpacity>
            </SpacerUi>
          )}
          {isRefetching && <ActivityIndicator />}
        </>
      )}
    />
  );
};

export default AssetHistory;
