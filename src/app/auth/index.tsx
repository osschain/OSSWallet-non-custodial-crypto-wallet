import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { defaultImage } from "@/util/DefaultImage";

function Auth() {
  const { t, i18n } = useTranslation();

  return (
    <ScrollContainerUi>
      <Body>
        <Logo resizeMode="contain" source={{ uri: defaultImage }} />
        <SpacerUi size="3.5xl">
          <HeaderTextUi adjustsFontSizeToFit size="3xl" weight="extra">
            {t("auth.index.header")}
          </HeaderTextUi>
        </SpacerUi>
        <SpacerUi size="4xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("auth.index.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <Footer>
        <Link href="auth/connect-wallet" asChild>
          <ConnectWallet variant="secondary">
            {t("auth.index.connect-wallet")}
          </ConnectWallet>
        </Link>
        <Link href="auth/seed-creating" asChild>
          <CreateNew>{t("auth.index.create-new")}</CreateNew>
        </Link>
      </Footer>
    </ScrollContainerUi>
  );
}

const Body = styled(BodyUi)`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled(FooterUi)`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const ConnectWallet = styled(ButtonUi)``;

const CreateNew = styled(ButtonUi)``;

export default Auth;
