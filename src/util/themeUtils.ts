import { DefaultTheme } from "styled-components/native";

export const getFontStyle = (
  theme: DefaultTheme,
  fontFamilyKey: "heading" | "body",
  fontWeightKey: "bold" | "semi" | "regular" | "medium"
) => {
  const fontFamily = theme.fonts[fontFamilyKey];
  const fontWeight = theme.fontWeights[fontWeightKey];
  return `${fontFamily}-${fontWeight}`;
};
