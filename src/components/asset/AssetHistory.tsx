import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import HistoryItem, { variants } from "../history/history-item";
import AlertWithImageUI from "../ui/AlertWithImageUi";
import FlatListUi from "../ui/FlatListUi";
import SpacerUi from "../ui/SpacerUi";

import { AssetType } from "@/@types/assets";
import { useAssets } from "@/app/api/assets";
import { useHistory } from "@/app/api/history";
import { PageTokensType } from "@/models/history.model";

const AssetHistory = ({ asset }: { asset: AssetType }) => {
  const { t } = useTranslation();
  const page = 10;
  const [pageTokens, setPageTokens] = useState<PageTokensType | undefined>();
  console.log("RERENDER");
  const { data: assetManager } = useAssets();
  const queryClient = useQueryClient();
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
    pageTokens,
  });

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
    if (history?.hasPageToken) {
      setPageTokens(history.pageTokens);
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
    <FlatListUi
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
      showLoadMore={history?.hasPageToken}
      isRefetching={isRefetching}
      onLoadMore={handlePagination}
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ["history"] });
      }}
    />
  );
};

export default AssetHistory;
