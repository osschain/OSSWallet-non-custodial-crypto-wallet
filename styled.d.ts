import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
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
    };
    // prettier-ignore
    spaces: {
      "sm": string;
      "md": string;
      "lg": string;
      "xl": string;
      "2xl": string;
      "3xl": string;
    };
    // prettier-ignore
    sizes: {
      "sm": string;
      "md": string;
      "lg": string;
      "xl": string;
      "2xl": string;
      "3xl": string;
    };
    fontSizes: {
      "header-2xl": string;
      "header-xl": string;
      "header-lg": string;
      "header-md": string;
      "header-sm": string;
      "body-lg": string;
      "body-md": string;
      "body-sm": string;
    };
    // prettier-ignore
    fontWeights: {
      "semi": number;
      "regular": number;
      "medium": number;
    };
    // prettier-ignore
    fonts: {
        "body": string,
        "heading": string,
    },
    // prettier-ignore
    lineHeights: {
        "2xl": string,
        "xl": string;
        "lg": string;
        "md": string;
        "sm": string;
        "xs": string;
    }
  }
}
