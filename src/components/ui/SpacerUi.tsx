import { View } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

type Sizes = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type Positions = "top" | "left" | "right" | "bottom";

interface PropsType {
  position: Positions;
  size: Sizes;
  theme: DefaultTheme;
}

export const SpacerUi = styled(View)<PropsType>`
  ${({ position, size, theme }) => `margin-${position}: ${theme.spaces[size]}`}
`;

SpacerUi.defaultProps = {
  position: "top",
  size: "md",
};
