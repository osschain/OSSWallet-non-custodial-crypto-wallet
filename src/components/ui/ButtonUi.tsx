import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled, { DefaultTheme } from "styled-components/native";

import { getFontStyle } from "@/util/themeUtils";

type Variant = "primary" | "secondary" | "red";
type Background = "blue-500" | "bg-third" | "red-500";
type TextColor = "pure-white" | "text-primary";

type ButtonStyles = {
  [key in Variant]: {
    background: Background;
    color: TextColor;
  };
};

const buttonStyles: ButtonStyles = {
  primary: {
    background: "blue-500",
    color: "pure-white",
  },
  secondary: {
    background: "bg-third",
    color: "text-primary",
  },
  red: {
    background: "red-500",
    color: "text-primary",
  },
};

const getBackground = (variant: Variant): Background => {
  return buttonStyles[variant].background;
};

const getTextColor = (variant: Variant): TextColor => {
  return buttonStyles[variant].color;
};

const Icon = styled.View`
  margin-left: ${({ theme }) => theme.spaces["xl"]};
`;

const Button = styled(TouchableOpacity)<{
  variant?: Variant;
  theme?: DefaultTheme;
}>`
  ${({ variant = "primary", theme }) => `
      padding: ${theme.sizes.xl} 0px;
      background: ${theme.colors[getBackground(variant)]};
      border-radius:   ${theme.sizes["md"]}
  `}
`;

const ButtonText = styled(Text)<{ variant: Variant; theme: DefaultTheme }>`
  ${({ variant, theme }) => `
      color: ${theme.colors[getTextColor(variant)]};  
      font-family: ${getFontStyle(theme, "body", "semi")};
      text-align: center;
  `}
`;

type Props = {
  variant?: Variant;
  icon?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  children: ReactNode;
} & ComponentPropsWithoutRef<typeof Button>;

const ButtonUi = forwardRef<TouchableOpacity, Props>(
  ({ variant = "primary", onPress, icon, children, ...rest }, ref) => {
    return (
      <Button ref={ref} variant={variant} onPress={onPress} {...rest}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <ButtonText variant={variant}>{children}</ButtonText>
          {icon && <Icon>{icon}</Icon>}
        </View>
      </Button>
    );
  }
);

export default ButtonUi;
