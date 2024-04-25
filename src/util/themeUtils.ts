import { DefaultTheme } from "styled-components/native";

import { FontWeightsType, FontsType } from "@/theme/types";

export const getFontStyle = (
  theme: DefaultTheme,
  fontFamilyKey: FontsType,
  fontWeightKey: FontWeightsType
) => {
  const fontFamily = theme.fonts[fontFamilyKey];
  const fontWeight = theme.fontWeights[fontWeightKey];
  return `${fontFamily}-${fontWeight}`;
};
