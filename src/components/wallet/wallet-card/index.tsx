import { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import {
  Card,
  BackgroundGradient,
  Header,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  MoneyAmount,
  CustomTokenButton,
} from "./style";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";

type Props = {
  label?: string;
  balance?: number;
  onRecieve?: () => void;
  onSend?: () => void;
  onCustomToken?: () => void;
  onHistory?: () => void;
} & ComponentPropsWithoutRef<typeof Card>;

const WalletCard = ({
  label = "OSSWallet",
  balance = undefined,
  onRecieve = () => {},
  onSend = () => {},
  onCustomToken = () => {},
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
        <HeaderTextUi size="lg" color="pure-white">
          {label}
        </HeaderTextUi>
        <SpacerUi size="xl">
          <MoneyAmount size="2xl">
            {!balance && balance !== 0 ? (
              <ActivityIndicator style={{ height: 41.3 }} />
            ) : (
              "$" + balance
            )}
          </MoneyAmount>
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
      <CustomTokenButton onPress={onCustomToken}>
        <IconUi library="AntDesign" name="plus" size="xl" color="pure-white" />
      </CustomTokenButton>
    </Card>
  );
};

export default WalletCard;
