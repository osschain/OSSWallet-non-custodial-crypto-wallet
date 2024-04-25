import { Text } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

import { BodyFontSizesType, FontWeightsType } from "../../../styled";

import { getFontStyle } from "@/util/themeUtils";

interface Props {
  size?: BodyFontSizesType;
  theme: DefaultTheme;
  weight?: FontWeightsType;
}

export const BodyTextUi = styled(Text)<Props>`
  ${({ size = "md", theme, weight = "regular" }) => `
      font-family: ${getFontStyle(theme, "heading", weight)};;
      font-size: ${theme.fontSizes.body[size]}; 
      line-height: ${theme.lineHeights[`${size}`]};
      color: ${theme.colors["text-primary"]};
    `}
`;

export default BodyTextUi;
