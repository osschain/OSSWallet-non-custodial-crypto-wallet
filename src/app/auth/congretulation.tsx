import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
const Congretulation = () => {
  const { t } = useTranslation();
  const continueHandler = () => {
    router.push("/(wallet)");
  };
  return (
    <ScrollContainerUi>
      <Body>
        <PocketImage
          resizeMode="contain"
          source={require("@/assets/images/pocket.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderTextUi size="2xl" weight="extra">
            {t("auth.congretulation.header")}
          </HeaderTextUi>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("auth.congretulation.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi>
        <Continue onPress={continueHandler}>
          {t("auth.congretulation.go-to-the-wallet")}
        </Continue>
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

const PocketImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

const Continue = styled(ButtonUi)``;

export default Congretulation;
