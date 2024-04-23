import { DefaultTheme } from "styled-components/native";

import { colorsLight, colorsDark } from "@/themes/colors";
import { fonts, fontWeights, fontSizes, lineHeights } from "@/themes/fonts";
import { sizes } from "@/themes/sizes";
import { spaces } from "@/themes/spacing";

export const lightTheme: DefaultTheme = {
  colors: colorsLight,
  spaces,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};

export const darkTheme: DefaultTheme = {
  colors: colorsDark,
  spaces,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
};
