import { View } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

import { SpacingType } from "@/theme/types";

type Sizes = SpacingType;
type Positions = "top" | "left" | "right" | "bottom";

interface PropsType {
  position?: Positions;
  size?: Sizes;
  theme: DefaultTheme;
  fullHeight?: boolean;
}

const SpacerUi = styled(View)<PropsType>`
  ${({ position = "top", size = "md", theme, fullHeight }) =>
    `
    margin-${position}: ${theme.spaces[size]};
    ${fullHeight ? "flex: 1;" : ""}
  `}
`;

export default SpacerUi;
