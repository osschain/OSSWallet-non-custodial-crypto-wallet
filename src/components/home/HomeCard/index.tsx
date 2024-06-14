import { Link } from "expo-router";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import {
  Card,
  BackgroundGradient,
  Header,
  Buttons,
  Button,
  ButtonBacground,
  ButtonIcon,
  MoneyAmount,
  TopRight,
  NotificationContainer,
} from "./style";

import { UseBalances } from "@/app/api/balances";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useNotification } from "@/providers/NotificationsProvider";
import { totalBalance } from "@/services/balances.service";

type Props = {
  label?: string;
  onRecieve?: () => void;
  onSend?: () => void;
  onCustomToken?: () => void;
  onHistory?: () => void;
} & ComponentPropsWithoutRef<typeof Card>;

const HomeCard = ({
  label = "OSSWallet",
  onRecieve = () => {},
  onSend = () => {},
  onCustomToken = () => {},
  onHistory = () => {},
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const { newNotifsNumber } = useNotification();
  const { data: balances, isLoading } = UseBalances();
  const balance = useMemo(() => {
    return totalBalance(balances) || 0;
  }, [balances]);

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
            {isLoading ? (
              <ActivityIndicator style={{ height: 41.3 }} />
            ) : (
              "$" + balance
            )}
          </MoneyAmount>
        </SpacerUi>
      </Header>
      <SpacerUi size="2xl">
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
      <TopRight>
        <Link href="notificationsModal" asChild>
          <TouchableOpacity>
            <IconUi
              library="Ionicons"
              name="notifications-outline"
              size="xl"
              color="pure-white"
            />
            {newNotifsNumber ? (
              <NotificationContainer>
                <BodyTextUi size="sm" color="pure-white">
                  {newNotifsNumber}
                </BodyTextUi>
              </NotificationContainer>
            ) : null}
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={onCustomToken}>
          <IconUi
            library="AntDesign"
            name="plus"
            size="xl"
            color="pure-white"
          />
        </TouchableOpacity>
      </TopRight>
    </Card>
  );
};

export default HomeCard;
