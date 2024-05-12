import { Feather } from "@expo/vector-icons";
import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";

import {
  Item,
  LeftContent,
  RightContent,
  Label,
  IconContainer,
  AssetAmount,
  Amount,
} from "./style";

import { pixelToNumber } from "@/util/pixelToNumber";

export type variants = "recieved" | "send" | "error";

type Props = {
  variant?: variants;
  walletAddress?: string;
  amount?: number;
} & ComponentPropsWithoutRef<typeof Item>;

const HistoryItem = ({
  variant = "send",
  walletAddress = "Can't Find Wallet Adress",
  amount = 2.5,
  ...rest
}: Props) => {
  const theme = useTheme();
  const iconVariant = () => {
    type Names = "arrow-down-right" | "x" | "arrow-up-right";

    let color = "";
    let name: Names = "x";

    switch (variant) {
      case "recieved":
        color = theme.colors["green-500"];
        name = "arrow-down-right";
        break;
      case "send":
        color = theme.colors["red-500"];
        name = "arrow-up-right";
        break;
      default:
        color = theme.colors["yellow-500"];
        name = "x";
    }
    return (
      <Feather
        name={name}
        size={pixelToNumber(theme.sizes["xl"])}
        color={color}
      />
    );
  };
  return (
    <Item {...rest}>
      <LeftContent>
        <IconContainer>{iconVariant()}</IconContainer>
        <View>
          <Label size="md">{variant}:</Label>
          <AssetAmount size="sm" weight="medium" color="text-second">
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
