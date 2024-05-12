import { router } from "expo-router";
import { Image, ScrollView } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

const SwapInProgress = () => {
  const doneHandler = () => {
    router.replace("(wallet)/home");
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Body>
          <PenImage
            resizeMode="contain"
            source={require("@/assets/images/pocket.png")}
          />

          <SpacerUi size="3.5xl">
            <HeaderText size="2xl" weight="extra">
              Swap in progress
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              Your transaction has been sent to the network and will be
              processed in a few seconds
            </DescriptionText>
          </SpacerUi>
        </Body>
        <Footer>
          <Continue onPress={doneHandler}>Done</Continue>
        </Footer>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Body = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const PenImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;

  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Continue = styled(ButtonUi)``;

export default SwapInProgress;
