import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import HistoryItem, { variants } from "@/components/history/history-item";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAssetHistory } from "@/providers/AssetHistoryProvider";
import { getAdresses } from "@/services/balances.service";
// eslint-disable-next-line import/order
import { useAsset } from "@/providers/AssetProvider";

export default function History() {
  const [network, setNetwork] = useState<Blockchain | null>(null);
  const { networks } = useAsset();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { histories, fetchHistories, loading } = useAssetHistory();
  const { assets } = useAsset();

  useEffect(() => {
    if (!histories) fetchHistories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  const filteredHistories = useMemo(() => {
    if (!network) {
      return histories;
    }

    return histories?.filter(
      (history) => history.blockchain === network.toLowerCase()
    );
  }, [histories, network]);

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

  if (loading) {
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
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom" key={item.to}>
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
