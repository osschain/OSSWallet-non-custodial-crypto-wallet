import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal, TouchableOpacity } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { HistoryType } from "@/@types/history";
import { useAssets } from "@/app/api/assets";
import { useHistories } from "@/app/api/history";
import { UseNetworks } from "@/app/api/network";
import HistoryItem, { variants } from "@/components/history/history-item";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { getAdresses } from "@/services/balances.service";

export default function History() {
  const [page, setPage] = useState(40);

  const [network, setNetwork] = useState<Blockchain | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { data: histories, isLoading, isError } = useHistories(page);

  const { data: networks } = UseNetworks();

  const filteredHistories = useMemo(() => {
    if (!network) {
      return histories;
    }

    return histories?.filter(
      (history) => history.blockchain === network.toLowerCase()
    );
  }, [histories, network]);

  if (isLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (!filteredHistories || isError || !histories?.length) {
    return (
      <AlertWithImageUi title={t("wallet.home.history.no-history-alert")} />
    );
  }

  const handlePagination = () => {
    if (histories[histories?.length - 1].nextPageToken) {
      setPage((prev) => prev + 40);
    } else {
      Alert.alert("...ops", "There is no more histories");
    }
  };

  return (
    <ContainerUi>
      <SpacerUi size="xl" position="bottom">
        <NetworkOptions
          networks={networks}
          ref={bottomSheetRef}
          onSelect={(selected) => setNetwork(selected)}
        />
      </SpacerUi>
      {!filteredHistories?.length && (
        <AlertWithImageUi title="Can't find history" />
      )}
      <SpacerUi size="xl" style={{ flex: filteredHistories?.length ? 1 : 0 }}>
        <RenderHistoryITem
          histories={filteredHistories}
          onLoadMore={handlePagination}
        />
      </SpacerUi>
    </ContainerUi>
  );
}

const RenderHistoryITem = ({
  histories,
  onLoadMore,
}: {
  histories: HistoryType[];
  onLoadMore: () => void;
}) => {
  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const checkAddres = (from: string | undefined): variants | undefined => {
    if (!assets || !from) return;
    const adresses = getAdresses(assets);
    const isFromMe = adresses.find(
      (adress) => adress.address.toLowerCase() === from.toLowerCase()
    );

    if (isFromMe) {
      return "send";
    } else if (!isFromMe) {
      return "recieved";
    }
  };

  return (
    <FlatList
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
              variant={checkAddres(item.from)}
              amount={item.value}
            />
          </TouchableOpacity>
        </SpacerUi>
      )}
      ListFooterComponent={() => (
        <SpacerUi style={{ padding: 20 }}>
          <TouchableOpacity onPress={onLoadMore}>
            <BodyTextUi color="blue-500" style={{ textAlign: "center" }}>
              Load More
            </BodyTextUi>
          </TouchableOpacity>
        </SpacerUi>
      )}
    />
  );
};
