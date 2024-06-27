import { Link } from "expo-router";
import { ComponentPropsWithoutRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";

import {
  Card,
  BackgroundGradient,
  Header,
  Buttons,
  Button,
  ButtonBacground,
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
import { useStore } from "@/providers/StoreProvider";

type Props = {
  label?: string;
  onRecieve?: () => void;
  onSend?: () => void;
  onCustomToken?: () => void;
  onHistory?: () => void;
} & ComponentPropsWithoutRef<typeof Card>;

const { width } = Dimensions.get("window");
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
  const { totalBalance } = useStore();

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
          <MoneyAmount size="2xl" color="pure-white">
            {totalBalance.toFixed(4)} $
          </MoneyAmount>
        </SpacerUi>
      </Header>
      <SpacerUi size="2xl">
        <Buttons>
          <Button onPress={onRecieve}>
            <IconUi
              library="Feather"
              name="arrow-down-left"
              size={width <= 375 ? "md" : "lg"}
              color="icon-primary"
            />
            <BodyTextUi size={width <= 375 ? "sm" : "md"} color="pure-white">
              {t("shared.receive")}
            </BodyTextUi>
            <ButtonBacground />
          </Button>
          <Button onPress={onSend}>
            <IconUi
              library="Feather"
              name="arrow-up-right"
              size={width <= 375 ? "md" : "lg"}
              color="icon-primary"
            />
            <BodyTextUi size={width <= 375 ? "sm" : "md"} color="pure-white">
              {t("shared.send")}
            </BodyTextUi>

            <ButtonBacground />
          </Button>
          <Button onPress={onHistory}>
            <IconUi
              library="MaterialIcons"
              name="history"
              size={width <= 375 ? "md" : "lg"}
              color="icon-primary"
            />
            <BodyTextUi size={width <= 375 ? "sm" : "md"} color="pure-white">
              {t("shared.history")}
            </BodyTextUi>

            <ButtonBacground />
          </Button>
        </Buttons>
      </SpacerUi>
      <TopRight>
        <TouchableOpacity onPress={onCustomToken}>
          <IconUi
            library="AntDesign"
            name="plus"
            size="xl"
            color="pure-white"
          />
        </TouchableOpacity>
        <Link href="notification" asChild>
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
      </TopRight>
    </Card>
  );
};

export default HomeCard;
