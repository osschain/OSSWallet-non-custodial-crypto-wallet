import { Text } from "react-native";
import { styled, DefaultTheme } from "styled-components/native";

type Sizes = "2xl" | "xl" | "lg" | "md" | "sm";

interface PropsType {
  size: Sizes;
  theme: DefaultTheme;
}

export const HeaderTextUi = styled(Text)<PropsType>`
  ${({ size, theme }) => `
    font-family:  ${theme.fonts["heading"]};
    font-size: ${theme.fontSizes[`header-${size}`]}; 
    font-weight: ${theme.fontWeights["semi"]};
    line-height: ${theme.lineHeights[`${size}`]};
    color: ${theme.colors["text-primary"]}
  `}
`;

HeaderTextUi.defaultProps = {
  size: "md",
};

export default HeaderTextUi;
