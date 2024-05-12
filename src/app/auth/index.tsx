import { Link } from "expo-router";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useLanguage } from "@/providers/LanguageProvider";
import { defaultImage } from "@/util/DefaultImage";

function Auth() {
  const { i18n } = useLanguage();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Body>
          <Logo resizeMode="contain" source={{ uri: defaultImage }} />
          <SpacerUi size="3.5xl">
            <HeaderText adjustsFontSizeToFit size="3xl" weight="extra">
              {i18n.t("auth.main.header")}
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="4xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              {i18n.t("auth.main.description")}
            </DescriptionText>
          </SpacerUi>
        </Body>
        <Footer>
          <Link href="auth/connect-wallet" asChild>
            <ConnectWallet variant="secondary">
              {i18n.t("auth.main.connect-wallet")}
            </ConnectWallet>
          </Link>
          <Link href="auth/seed-creating" asChild>
            <CreateNew>{i18n.t("auth.main.create-new")}</CreateNew>
          </Link>
        </Footer>
      </ScrollView>
    </Container>
  );
}

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

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;

  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const ConnectWallet = styled(ButtonUi)``;

const CreateNew = styled(ButtonUi)``;

export default Auth;
