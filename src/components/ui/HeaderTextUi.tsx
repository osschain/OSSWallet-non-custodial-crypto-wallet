import { Text } from "react-native";
import { styled, DefaultTheme } from "styled-components/native";

import { HeaderFontSizesType } from "@/theme/types";
import { getFontStyle } from "@/util/themeUtils";

interface Props {
  size?: HeaderFontSizesType;
  theme: DefaultTheme;
}

export const HeaderTextUi = styled(Text)<Props>`
  ${({ size = "md", theme }) => `
    font-family: ${getFontStyle(theme, "heading", "semi")};;
    font-size: ${theme.fontSizes.header[size]}; 
    line-height: ${theme.lineHeights[`${size}`]};
    color: ${theme.colors["text-primary"]};
  `}
`;

export default HeaderTextUi;
