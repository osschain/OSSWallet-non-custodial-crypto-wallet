import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import styled from "styled-components/native";

import HistoryItem from "@/components/history/history-item";
import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import SpacerUi from "@/components/ui/SpacerUi";
import { networks } from "@/util/mock";

export default function History() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <Container>
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
      <SpacerUi size="xl">
        <HistoryItem />
      </SpacerUi>
      <SpacerUi size="xl">
        <HistoryItem />
      </SpacerUi>
      <SpacerUi size="xl">
        <HistoryItem />
      </SpacerUi>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;
