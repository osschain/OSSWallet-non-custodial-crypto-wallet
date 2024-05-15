import { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  BackgroundGradient,
  Header,
  UserName,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  MoneyAmount,
  Options,
} from "./style";

import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";

type Props = {
  userName?: string;
  moneyAmount?: string;
  onRecieve?: () => void;
  onSend?: () => void;
  onOptions?: () => void;
  onHistory?: () => void;
} & ComponentPropsWithoutRef<typeof Card>;

const WalletCard = ({
  userName = "Ton Wallet",
  moneyAmount = "$ 1520,056",
  onRecieve = () => {},
  onSend = () => {},
  onOptions = () => {},
  onHistory = () => {},
  ...rest
}: Props) => {
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
              <IconUi
                library="Feather"
                name="arrow-down-left"
                size="lg"
                color="icon-primary"
              />
            </ButtonIcon>
            <BodyTextUi color="pure-white">{t("shared.receive")}</BodyTextUi>
            <ButtonBacground />
          </Button>
          <Button onPress={onSend}>
            <BodyTextUi color="pure-white">{t("shared.send")}</BodyTextUi>
            <ButtonIcon>
              <IconUi
                library="Feather"
                name="arrow-up-right"
                size="lg"
                color="icon-primary"
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
          <Button onPress={onHistory}>
            <BodyTextUi color="pure-white">{t("shared.history")}</BodyTextUi>
            <ButtonIcon>
              <IconUi
                library="MaterialIcons"
                name="history"
                size="xl"
                color="icon-primary"
              />
            </ButtonIcon>
            <ButtonBacground />
          </Button>
        </Buttons>
      </SpacerUi>
      <Options onPress={onOptions}>
        <IconUi
          library="Entypo"
          name="dots-three-vertical"
          size="xl"
          color="icon-primary"
        />
      </Options>
    </Card>
  );
};

export default WalletCard;
