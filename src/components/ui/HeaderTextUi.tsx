import { Text } from "react-native";
import { styled, DefaultTheme } from "styled-components/native";

import {
  ColorsType,
  FontWeightsType,
  HeaderFontSizesType,
} from "@/theme/types";
import { getFontStyle } from "@/util/themeUtils";

interface Props {
  size?: HeaderFontSizesType;
  weight?: FontWeightsType;
  theme: DefaultTheme;
  color?: ColorsType;
}

const HeaderTextUi = styled(Text)<Props>`
  ${({ size = "md", color = "text-primary", weight = "semi", theme }) => `
    font-family: ${getFontStyle(theme, "heading", weight)};
    font-size: ${theme.fontSizes.header[size]}; 
    line-height: ${theme.lineHeights[`${size}`]};
    color: ${theme.colors[color]};
  `}
`;

export default HeaderTextUi;
