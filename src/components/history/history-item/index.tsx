import { ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import {
  Item,
  LeftContent,
  RightContent,
  Label,
  IconContainer,
  Amount,
} from "./style";

import IconUi from "@/components/ui/IconUi";
import TruncatedText from "@/components/ui/TruncatedTextUi";
import { BodyUi } from "@/components/ui/LayoutsUi";
import BodyTextUi from "@/components/ui/BodyTextUi";

export type variants = "recieved" | "send" | "error";

type Props = {
  variant?: variants;
  walletAddress?: string;
  amount?: string;
  type: "NFT" | "TOKEN";
} & ComponentPropsWithoutRef<typeof Item>;

const HistoryItem = ({
  type = "TOKEN",
  variant = "send",
  walletAddress = "",
  amount = "2.5",
  ...rest
}: Props) => {
  const { t } = useTranslation();

  const iconVariant = () => {
    type Names = "arrow-down-right" | "x" | "arrow-up-right";

    // let color = "";
    let name: Names = "x";

    switch (variant) {
      case "recieved":
        // color = theme.colors["green-500"];
        name = "arrow-down-right";
        break;
      case "send":
        // color = theme.colors["red-500"];
        name = "arrow-up-right";
        break;
      default:
        // color = theme.colors["yellow-500"];
        name = "x";
    }
    return (
      <IconUi library="Feather" name={name} size="xl" color="icon-second" />
    );
  };
  return (
    <Item {...rest}>
      <LeftContent>
        <IconContainer>{iconVariant()}</IconContainer>
        <View>
          <Label size="md">
            {type === "NFT" ? t("shared.NFT") : t("shared.token")} - Transfer
          </Label>
          <TruncatedText
            startLength={7}
            endLength={7}
            maxLength={15}
            size="sm"
            weight="medium"
            color="text-second"
            text={walletAddress}
          />
        </View>
      </LeftContent>
      {variant !== "error" && (
        <RightContent>
          <Amount numberOfLines={1} size="md" variant={variant}>
            {variant === "recieved" ? "+" : "-"}{" "}
          </Amount>
          <BodyTextUi>{Number(amount).toFixed(2)}</BodyTextUi>
        </RightContent>
      )}
    </Item>
  );
};

export default HistoryItem;
