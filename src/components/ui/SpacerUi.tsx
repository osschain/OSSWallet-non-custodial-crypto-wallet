import { View } from "react-native";
import { DefaultTheme, styled } from "styled-components/native";

import { SizesType } from "@/theme/types";

type Sizes = SizesType;
type Positions = "top" | "left" | "right" | "bottom";

interface PropsType {
  position?: Positions;
  size?: Sizes;
  theme: DefaultTheme;
}

const SpacerUi = styled(View)<PropsType>`
  ${({ position = "top", size = "md", theme }) =>
    `margin-${position}: ${theme.spaces[size]}`}
`;

export default SpacerUi;
