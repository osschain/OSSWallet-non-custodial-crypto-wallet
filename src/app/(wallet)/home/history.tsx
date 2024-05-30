import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { getAddress } from "ethers";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native-gesture-handler";

import HistoryItem, { variants } from "@/components/history/history-item";
import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAssetHistory } from "@/providers/AssetHistoryProvider";
import { history, networks } from "@/util/mock";
// eslint-disable-next-line import/order
import { useAsset } from "@/providers/AssetProvider";
import { getAdresses } from "@/services/balances.service";

export default function History() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { t } = useTranslation();
  const { histories, fetchHistories, loading } = useAssetHistory();
  const { assets } = useAsset();

  useEffect(() => {
    fetchHistories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

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

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  if (loading) {
    return (
      <AlertWithImageUi title={t("wallet.home.history.no-history-alert")} />
    );
  }

  return (
    <ContainerUi>
      <NetworkOptions
        networks={networks}
        ref={bottomSheetRef}
        onSelect={() => {}}
      />
      <SpacerUi size="xl" position="bottom">
        <NetworkButton onPress={handlePresentModalPress}>
          {t("shared.all")} {t("shared.network")}
        </NetworkButton>
      </SpacerUi>
      <SpacerUi size="xl" style={{ flex: 1 }}>
        <FlatList
          data={histories}
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
