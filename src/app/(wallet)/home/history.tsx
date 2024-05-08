import { EvilIcons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import styled, { useTheme } from "styled-components/native";

import NetworkOptions from "@/components/history/NetworkOptions";
import HistoryItem from "@/components/history/history-item";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { defaultImage } from "@/util/DefaultImage";
import { pixelToNumber } from "@/util/pixelToNumber";

const networks = [
  {
    id: 1,
    image: defaultImage,
    label: "Acala",
  },
  {
    id: 2,
    image: defaultImage,
    label: "bitcoin",
  },
];

export default function History() {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <Container>
      <NetworkOptions networks={networks} ref={bottomSheetRef} />
      <SpacerUi size="xl" position="bottom">
        <NetworkButton variant="secondary" onPress={handlePresentModalPress}>
          <FlexContainer style={{ flexDirection: "row", gap: 10 }}>
            <BodyTextUi weight="medium">All Network</BodyTextUi>
            <EvilIcons
              name="arrow-up"
              size={pixelToNumber(theme.sizes["xl"])}
              color={theme.colors["text-primary"]}
            />
          </FlexContainer>
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

const NetworkButton = styled(ButtonUi)`
  width: 40%;
  padding: ${({ theme }) => theme.spaces["lg"]}
    ${({ theme }) => theme.spaces["lg"]};
`;

const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["md"]};
`;
