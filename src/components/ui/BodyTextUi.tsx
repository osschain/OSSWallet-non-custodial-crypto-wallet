import { Text } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

type Sizes = "lg" | "md" | "sm";
type Weights = "medium" | "regular";

interface Props {
  size: Sizes;
  theme: DefaultTheme;
  weight: Weights;
}

export const BodyTextUi = styled(Text)<Props>`
  ${({ size, theme, weight }) => `
      font-family:  ${theme.fonts["body"]};
      font-size: ${theme.fontSizes[`body-${size}`]}; 
      font-weight: ${theme.fontWeights[weight]};
      line-height: ${theme.lineHeights[`${size}`]};
      color: ${theme.colors["text-primary"]};
    `}
`;

BodyTextUi.defaultProps = {
  size: "md",
  weight: "regular",
};

export default BodyTextUi;
