import { Link } from "expo-router";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { Container } from "@/components/ui/Container";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { defaultImage } from "@/util/DefaultImage";

const Header = styled.View`
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
  margin-top: auto;
  margin-bottom: 48px;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const ConnectWallet = styled(ButtonUi)``;

const CreateNew = styled(ButtonUi)``;

export default function Auth() {
  return (
    <Container>
      <Header>
        <Logo resizeMode="contain" source={{ uri: defaultImage }} />
        <SpacerUi size="3.5xl">
          <HeaderText adjustsFontSizeToFit size="3xl" weight="extra">
            Crypto Wallet
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="4xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            TON wallet allows you to make fast and secure blockchain-based
            payments without intermediaries.
          </DescriptionText>
        </SpacerUi>
      </Header>
      <Footer>
        <ConnectWallet variant="secondary">Connect Wallet</ConnectWallet>
        <Link href="/auth/seed-creating" asChild>
          <CreateNew>Create New</CreateNew>
        </Link>
      </Footer>
    </Container>
  );
}
