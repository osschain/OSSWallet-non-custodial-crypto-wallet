import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

const SwapInProgress = () => {
  const { t } = useTranslation();
  const doneHandler = () => {
    router.replace("(wallet)/home");
  };
  return (
    <ScrollContainerUi>
      <Body>
        <BannerImage
          resizeMode="contain"
          source={require("@/assets/images/pocket.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderTextUi size="2xl" weight="bold">
            {t("wallet.swap.swap-in-progress.header")}
          </HeaderTextUi>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("wallet.swap.swap-in-progress.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi marginSize="sm">
        <ButtonUi onPress={doneHandler}>{t("shared.done")}</ButtonUi>
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

const BannerImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

export default SwapInProgress;
