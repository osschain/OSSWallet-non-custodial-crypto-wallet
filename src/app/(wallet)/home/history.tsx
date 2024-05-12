import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

import HistoryItem from "@/components/history/history-item";
import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUi from "@/components/ui/AlertWithImageUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { history, networks } from "@/util/mock";

export default function History() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  if (!history) {
    return <AlertWithImageUi title="No history yet" />;
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
          All Network
        </NetworkButton>
      </SpacerUi>
      <SpacerUi size="xl" style={{ flex: 1 }}>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <SpacerUi size="xl" position="bottom" key={item.id}>
              <HistoryItem
                walletAddress={item.walletAddress}
                variant={item.send ? "send" : "recieved"}
                amount={item.send ? item.send : item.recieved}
              />
            </SpacerUi>
          )}
        />
      </SpacerUi>
    </ContainerUi>
  );
}
