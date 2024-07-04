import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import HistoryItem, { variants } from "../history/history-item";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import FlatListUi from "../ui/FlatListUi";
import SpacerUi from "../ui/SpacerUi";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import { useInfiniteHistory } from "@/app/api/history";

const AssetHistory = ({ asset }: { asset: AssetType }) => {
  const { t } = useTranslation();
  const { data: assetManager } = useAssets();
  const queryClient = useQueryClient();
  const isToken = !!asset?.contractAddress;
  const { account, blockchain, id } = asset || {};

  const {
    data,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteHistory({
    address: account?.address,
    id,
    blockchain,
    isToken,
  });

  const histories = useMemo(() => {
    console.log(data?.pages);
    return data?.pages.flatMap((page) => page.histories) || [];
  }, [data]);

  const assetHistory = useMemo(() => {
    if (!histories) return [];
    return histories.filter(
      (history) => history.id.toLowerCase() === asset?.id.toLowerCase()
    );
  }, [asset?.id, histories]);

  if (isFetching && !isFetchingNextPage) {
    return (
      <SpacerUi size="4xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (isError || !assetHistory.length) {
    return <AlertWithImageUI title={t("wallet.home.asset.history-error")} />;
  }

  const handlePagination = () => {
    fetchNextPage();
  };

  const checkAddress = (from: string | undefined): variants | undefined => {
    if (!assetManager || !from) return;

    try {
      const isFromMe = assetManager.addresses.find((address) => {
        return address.address.toLowerCase() === from.toLowerCase();
      });

      if (isFromMe) {
        return "send";
      } else {
        return "recieved";
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  return (
    <FlatListUi
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
              variant={checkAddress(item.from)}
              amount={item.value}
            />
          </TouchableOpacity>
        </SpacerUi>
      )}
      showLoadMore={hasNextPage}
      isRefetching={isFetchingNextPage}
      onLoadMore={handlePagination}
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ["history", id] });
      }}
    />
  );
};

export default AssetHistory;
