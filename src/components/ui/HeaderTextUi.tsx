import { Text } from "react-native";
import { styled, DefaultTheme } from "styled-components/native";

type Sizes = "2xl" | "xl" | "lg" | "md" | "sm";

interface Props {
  size?: Sizes;
  theme: DefaultTheme;
}

export const HeaderTextUi = styled(Text)<Props>`
  ${({ size = "md", theme }) => `
    font-family:  ${theme.fonts["heading"]};
    font-size: ${theme.fontSizes[`header-${size}`]}; 
    font-weight: ${theme.fontWeights["semi"]};
    line-height: ${theme.lineHeights[`${size}`]};
    color: ${theme.colors["text-primary"]};
  `}
`;

export default HeaderTextUi;
