import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useAssets } from "@/app/api/assets";
import { useHistories } from "@/app/api/history";
import { UseNetworks } from "@/app/api/network";
import HistoryItem, { variants } from "@/components/history/history-item";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { getAdresses } from "@/services/balances.service";

export default function History() {
  const [network, setNetwork] = useState<Blockchain | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { data: histories, isLoading } = useHistories();
  const { data: assets } = useAssets();
  const { data: networks } = UseNetworks();

  const filteredHistories = useMemo(() => {
    if (!network) {
      return histories;
    }

    return histories?.filter(
      (history) => history.blockchain === network.toLowerCase()
    );
  }, [histories, network]);

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

  if (isLoading) {
    return (
      <SpacerUi size="xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (histories?.length === 0 || !histories) {
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
      {!filteredHistories?.length && (
        <AlertWithImageUi title="Can't find history" />
      )}
      <SpacerUi size="xl" style={{ flex: filteredHistories?.length ? 1 : 0 }}>
        <FlatList
          data={filteredHistories}
          keyExtractor={(item) => item.hash}
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
