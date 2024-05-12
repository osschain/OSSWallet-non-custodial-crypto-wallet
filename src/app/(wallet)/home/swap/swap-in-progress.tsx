import { router } from "expo-router";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

const SwapInProgress = () => {
  const doneHandler = () => {
    router.replace("(wallet)/home");
  };
  return (
    <ScrollContainerUi>
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
            Your transaction has been sent to the network and will be processed
            in a few seconds
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi marginSize="sm">
        <Continue onPress={doneHandler}>Done</Continue>
      </FooterUi>
    </ScrollContainerUi>
  );
};

const Body = styled(BodyUi)`
  align-items: center;
  justify-content: center;
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

const Continue = styled(ButtonUi)``;

export default SwapInProgress;
