import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { ComponentPropsWithoutRef } from "react";
import { useTheme } from "styled-components/native";

import {
  Card,
  BackgroundGradient,
  Header,
  UserName,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  ButtonText,
  MoneyAmount,
  Options,
} from "./style";

import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";
import { useTranslation } from "react-i18next";

type Props = {
  userName?: string;
  walletAddres?: string;
  moneyAmount?: string;
  onRecieve?: () => void;
  onSend?: () => void;
  onOptions?: () => void;
  onHistory?: () => void;
} & ComponentPropsWithoutRef<typeof Card>;

const WalletCard = ({
  userName = "Ton Wallet",
  walletAddres = "EQDHirLoAYIhplO....",
  moneyAmount = "$ 1520,056",
  onRecieve = () => {},
  onSend = () => {},
  onOptions = () => {},
  onHistory = () => {},
  ...rest
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Card {...rest}>
      <BackgroundGradient
        colors={["#1566DF", "#21C5DB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <Header>
        <UserName size="lg" color="pure-white">
          {userName}
        </UserName>
        <SpacerUi size="xl">
          <MoneyAmount size="2xl">{moneyAmount}</MoneyAmount>
        </SpacerUi>
      </Header>
      <SpacerUi size="4xl">
        <Buttons>
          <Button onPress={onRecieve}>
            <ButtonIcon>
              <Feather
                name="arrow-down-left"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonText color="pure-white">{t("shared.receive")}</ButtonText>
            <ButtonBacground />
          </Button>
          <Button onPress={onSend}>
            <ButtonText color="pure-white">{t("shared.send")}</ButtonText>
            <ButtonIcon>
              <Feather
                name="arrow-up-right"
                size={pixelToNumber(theme.sizes["lg"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
          <Button onPress={onHistory}>
            <ButtonText color="pure-white">{t("shared.history")}</ButtonText>
            <ButtonIcon>
              <MaterialIcons
                name="history"
                size={pixelToNumber(theme.sizes["xl"])}
                color={theme.colors["pure-white"]}
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
        </Buttons>
      </SpacerUi>
      <Options onPress={onOptions}>
        <Entypo
          name="dots-three-vertical"
          size={pixelToNumber(theme.sizes["xl"])}
          color={theme.colors["pure-white"]}
        />
      </Options>
    </Card>
  );
};

export default WalletCard;
