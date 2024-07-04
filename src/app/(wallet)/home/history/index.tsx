import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal, TouchableOpacity } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import { HistoryType } from "@/@types/history";
import { useAssets } from "@/app/api/assets";
import { useInfiniteHistories } from "@/app/api/history";
import { UseNetworks } from "@/app/api/network";
import HistoryItem, { variants } from "@/components/history/history-item";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import FlatListUi from "@/components/ui/FlatListUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function History() {
  const [network, setNetwork] = useState<Blockchain | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteHistories();
  const { data: networks } = UseNetworks();

  const histories = useMemo(() => {
    return data?.pages.flatMap((page) => page.histories) || [];
  }, [data]);

  const filteredHistories = useMemo(() => {
    if (!network) {
      return histories;
    }

    return histories.filter(
      (history) => history.blockchain === network.toLowerCase()
    );
  }, [histories, network]);

  if (isFetching && !isFetchingNextPage) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }
  if (isError) {
    return (
      <AlertWithImageUi title={t("wallet.home.history.no-history-alert")} />
    );
  }
  return (
    <ContainerUi>
      <SpacerUi size="xl" position="bottom">
        <NetworkOptions
          networks={networks}
          ref={bottomSheetRef}
          onSelect={(selected) => setNetwork(selected)}
        />
      </SpacerUi>
      {!filteredHistories.length && (
        <AlertWithImageUi title={t("wallet.home.history.index.alert-error")} />
      )}
      <SpacerUi size="xl" style={{ flex: filteredHistories.length ? 1 : 0 }}>
        <RenderHistoryItem
          histories={filteredHistories}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          showLoadMore={hasNextPage}
        />
      </SpacerUi>
    </ContainerUi>
  );
}

const RenderHistoryItem = ({
  histories,
  onLoadMore,
  isFetchingNextPage,
  showLoadMore,
}: {
  histories: HistoryType[];
  onLoadMore: () => void;
  isFetchingNextPage: boolean;
  showLoadMore: boolean | undefined;
}) => {
  const { data: assetManager } = useAssets();
  const queryClient = useQueryClient();

  const checkAddress = (from: string | undefined): variants | undefined => {
    if (!assetManager || !from) return;

    try {
      const isFromMe = assetManager.addresses.find((address) => {
        return address.address.toLowerCase() === from.toLowerCase();
      });

      if (isFromMe) {
        return "send";
      } else {
        return "received";
      }
    } catch (error) {
      console.log(error);
      return "error";
    }
  };

  return (
    <FlatListUi
      data={histories}
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
      showLoadMore={showLoadMore}
      isRefetching={isFetchingNextPage}
      onLoadMore={onLoadMore}
      onRefresh={async () => {
        await queryClient.invalidateQueries({ queryKey: ["histories"] });
      }}
    />
  );
};
