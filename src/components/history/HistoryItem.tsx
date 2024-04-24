import { Entypo, Feather } from "@expo/vector-icons";
import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import HeaderTextUi from "../ui/HeaderTextUi";

import { defaultImage } from "@/util/DefaultImage";
import { pixelToNumber } from "@/util/pixelToNumber";

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;
const LeftContent = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  background-color: #f2eff6;
`;

const Label = styled(HeaderTextUi)`
  text-transform: capitalize;
`;
const AssetAmount = styled(BodyTextUi)`
  color: ${({ theme }) => theme.colors["text-second"]};
`;
const RightContent = styled.View``;

const Amount = styled(HeaderTextUi)<{ variant: variants }>`
  color: ${(props) =>
    props.variant === "recieved"
      ? props.theme.colors["green-500"]
      : props.theme.colors["red-500"]};
`;

type variants = "recieved" | "send" | "error";

type Props = {
  variant: variants;
  uri: string;
  walletAddress: string;
  amount: string;
} & ComponentPropsWithoutRef<typeof Item>;

export default function HistoryItem({
  variant = "send",
  uri = defaultImage,
  walletAddress = "Can't Find Wallet Adress",
  amount = "2.5",
  ...rest
}: Props) {
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
        size={pixelToNumber(theme.sizes["lg"])}
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
          <AssetAmount size="sm" weight="medium">
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
}
