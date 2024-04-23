import { DefaultTheme } from "styled-components/native";

import { colorsLight, colorsDark } from "./colors";
import { fonts, fontWeights, fontSizes } from "./fonts";
import { sizes } from "./sizes";
import { spaces, lineHeights } from "./spacing";

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
