import "styled-components/native";

interface Colors {
  "yellow-500": string;
  "text-primary": string;
  "text-second": string;
  "bg-primary": string;
  "bg-second": string;
  "bg-third": string;
  "border-color": string;
  "bg-input": string;
  "light-100": string;
  "blue-700": string;
  "blue-500": string;
  "blue-100": string;
  "green-700": string;
  "green-500": string;
  "green-100": string;
  "red-700": string;
  "red-500": string;
  "red-100": string;
  "pure-white": string;
  "icon-primary": string;
  "icon-second": string;
  "placeholder": "string"

}

interface Spacing {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "3.5xl": string;
  "4xl": string;
}

interface Sizes {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "3.5xl": string;
  "4xl": string;
  "5xl": string;
}

interface HeaderFontSizes {
  "4xl": string;
  "3xl": string;
  "2xl": string;
  xl: string;
  lg: string;
  md: string;
  sm: string;
}

interface BodyFontSizes {
  lg: string;
  md: string;
  sm: string;
}

interface FontSizes {
  header: HeaderFontSizes;
  body: BodyFontSizes;
}

interface FontWeights {
  bold: number;
  regular: number;
  medium: number;
  semi: number;
  light: number;
}

interface Fonts {
  body: string;
  heading: string;
}

interface LineHeights {
  "4xl": string;
  "3xl": string;
  "2xl": string;
  xl: string;
  lg: string;
  md: string;
  sm: string;
}

export type ColorsType = keyof Colors;
export type SpacingType = keyof Spacing;
export type SizesType = keyof Sizes;
export type FontSizesType = keyof FontSizes;
export type FontWeightsType = keyof FontWeights;
export type FontsType = keyof Fonts;
export type LineHeighsType = keyof LineHeights;
export type HeaderFontSizesType = keyof HeaderFontSizes;
export type BodyFontSizesType = keyof BodyFontSizes;

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: Colors;
    spaces: Spacing;
    sizes: Sizes;
    fontSizes: FontSizes;
    fontWeights: FontWeights;
    fonts: Fonts;
    lineHeights: LineHeights;
  }
}
