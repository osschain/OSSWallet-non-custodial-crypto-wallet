import { Text } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

import { getFontStyle } from "@/util/themeUtils";

type Sizes = "lg" | "md" | "sm";
type Weights = "medium" | "regular";

interface Props {
  size?: Sizes;
  theme: DefaultTheme;
  weight?: Weights;
}

export const BodyTextUi = styled(Text)<Props>`
  ${({ size = "md", theme, weight = "regular" }) => `
      font-family: ${getFontStyle(theme, "heading", weight)};;
      font-size: ${theme.fontSizes[`body-${size}`]}; 
      line-height: ${theme.lineHeights[`${size}`]};
      color: ${theme.colors["text-primary"]};
    `}
`;

export default BodyTextUi;
