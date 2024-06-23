import { Link } from "expo-router";
import { View } from "react-native";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function AuthError() {
  return (
    <ContainerUi>
      <StyledSpacer size="4xl" fullHeight>
        <CenteredView>
          <IconUi
            size="5xl"
            library="MaterialIcons"
            name="error-outline"
            color="red-100"
          />
        </CenteredView>
        <SpacerUi size="xl">
          <CenteredText size="2xl">
            There is error during wallet creation
          </CenteredText>
        </SpacerUi>
        <SpacerUi size="xl">
          <Link href="/auth/" asChild>
            <ButtonUi>Start Again</ButtonUi>
          </Link>
        </SpacerUi>
      </StyledSpacer>
    </ContainerUi>
  );
}

const CenteredView = styled(View)`
  align-items: center;
  justify-content: center;
`;

const CenteredText = styled(HeaderTextUi)`
  text-align: center;
  color: ${({ theme }) => theme.colors["red-100"]};
`;

const StyledSpacer = styled(SpacerUi)`
  justify-content: center;
`;
