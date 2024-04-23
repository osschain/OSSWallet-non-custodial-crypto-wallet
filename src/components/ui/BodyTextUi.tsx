import { Text } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

type Sizes = "lg" | "md" | "sm";
type Weights = "medium" | "regular";

interface Props {
  size?: Sizes;
  theme: DefaultTheme;
  weight?: Weights;
}

export const BodyTextUi = styled(Text)<Props>`
  ${({ size = "md", theme, weight = "regular" }) => `
      font-family:  ${theme.fonts["body"]};
      font-size: ${theme.fontSizes[`body-${size}`]}; 
      font-weight: ${theme.fontWeights[weight]};
      line-height: ${theme.lineHeights[`${size}`]};
      color: ${theme.colors["text-primary"]};
    `}
`;

export default BodyTextUi;
