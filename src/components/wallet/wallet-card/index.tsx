import { Entypo, Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  Card,
  BackgroundGradient,
  Header,
  UserName,
  WalletAdressContainer,
  WalletAdress,
  CopyAddres,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  ButtonText,
  MoneyAmount,
  TopRight,
} from "./style";

import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";

export default function WalletCard() {
  const theme = useTheme();
  return (
    <Card>
      <BackgroundGradient
        colors={["#1566DF", "#21C5DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Header>
        <UserName size="lg">Ton Wallet</UserName>
        <SpacerUi size="lg">
          <WalletAdressContainer>
            <WalletAdress size="sm">EQDHirLoAYIhplO....</WalletAdress>
            <CopyAddres>
              <Feather
                name="copy"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </CopyAddres>
          </WalletAdressContainer>
        </SpacerUi>
        <SpacerUi size="xl">
          <MoneyAmount size="2xl">$ 1520,056</MoneyAmount>
        </SpacerUi>
      </Header>
      <SpacerUi size="4xl">
        <Buttons>
          <Button>
            <ButtonIcon>
              <Feather
                name="arrow-down-left"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonText>Receive</ButtonText>
            <ButtonBacground />
          </Button>
          <Button>
            <ButtonText>Send</ButtonText>
            <ButtonIcon>
              <Feather
                name="arrow-down-right"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
        </Buttons>
      </SpacerUi>
      <TopRight>
        <Entypo
          name="dots-three-vertical"
          size={pixelToNumber(theme.sizes["xl"])}
          color={theme.colors["pure-white"]}
        />
      </TopRight>
    </Card>
  );
}
