import { Text } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

import {
  BodyFontSizesType,
  ColorsType,
  FontWeightsType,
} from "../../../styled";

import { getFontStyle } from "@/util/themeUtils";

interface Props {
  size?: BodyFontSizesType;
  color?: ColorsType;
  theme: DefaultTheme;
  weight?: FontWeightsType;
}

const BodyTextUi = styled(Text)<Props>`
  ${({ color = "text-primary", size = "md", theme, weight = "regular" }) => `
      font-family: ${getFontStyle(theme, "heading", weight)};;
      font-size: ${theme.fontSizes.body[size]}; 
      line-height: ${theme.lineHeights[`${size}`]};
      color: ${theme.colors[color]};
    `}
`;

export default BodyTextUi;
