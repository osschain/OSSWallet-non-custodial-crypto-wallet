import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";

import {
  Item,
  LeftContent,
  RightContent,
  Label,
  IconContainer,
  AssetAmount,
  Amount,
} from "./style";

import IconUi from "@/components/ui/IconUi";

export type variants = "recieved" | "send" | "error";

type Props = {
  variant?: variants;
  walletAddress?: string;
  amount?: string;
} & ComponentPropsWithoutRef<typeof Item>;

const HistoryItem = ({
  variant = "",
  walletAddress = "",
  amount = "2.5",
  ...rest
}: Props) => {
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
          <Label size="md">{variant}:</Label>
          <AssetAmount
            numberOfLines={1}
            size="sm"
            weight="medium"
            color="text-second"
          >
            {walletAddress}
          </AssetAmount>
        </View>
      </LeftContent>
      {variant !== "error" && (
        <RightContent>
          <Amount size="md" variant={variant}>
            {variant === "recieved" ? "+" : "-"} {amount}
          </Amount>
        </RightContent>
      )}
    </Item>
  );
};

export default HistoryItem;
