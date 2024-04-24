import { Text } from "react-native";
import { styled, DefaultTheme } from "styled-components/native";

import { getFontStyle } from "@/util/themeUtils";

type Sizes = "2xl" | "xl" | "lg" | "md" | "sm";

interface Props {
  size?: Sizes;
  theme: DefaultTheme;
}

export const HeaderTextUi = styled(Text)<Props>`
  ${({ size = "md", theme }) => `
    font-family: ${getFontStyle(theme, "heading", "semi")};;
    font-size: ${theme.fontSizes[`header-${size}`]}; 
    line-height: ${theme.lineHeights[`${size}`]};
    color: ${theme.colors["text-primary"]};
  `}
`;

export default HeaderTextUi;
