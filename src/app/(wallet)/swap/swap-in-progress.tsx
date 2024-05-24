import { CommonActions } from "@react-navigation/native";
import { useNavigation, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

const SwapInProgress = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleResetAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ key: "(wallet)", name: "(wallet)" }],
      })
    );
  };

  const doneHandler = () => {
    router.replace("(wallet)/home");
    handleResetAction();
  };
  return (
    <ScrollContainerUi>
      <Body>
        <BannerImage
          resizeMode="contain"
          source={require("@/assets/images/pocket.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderText size="2xl" weight="bold">
            {t("wallet.swap.swap-in-progress.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("wallet.swap.swap-in-progress.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi marginSize="sm">
        <Continue onPress={doneHandler}>{t("shared.done")}</Continue>
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

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const Continue = styled(ButtonUi)``;

export default SwapInProgress;
