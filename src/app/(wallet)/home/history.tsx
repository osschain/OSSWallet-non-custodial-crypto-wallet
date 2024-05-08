import styled from "styled-components/native";

import HistoryItem from "@/components/history/history-item";
import SpacerUi from "@/components/ui/SpacerUi";

export default function history() {
  return (
    <Container>
      <SpacerUi>
        <HistoryItem />
      </SpacerUi>
      <SpacerUi>
        <HistoryItem />
      </SpacerUi>
      <SpacerUi>
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
