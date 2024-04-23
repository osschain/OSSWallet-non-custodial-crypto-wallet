import Checkbox from "expo-checkbox";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

const StyledCheckBox = styled(Checkbox)`
  width: ${($props) => $props.theme.sizes["2xl"]};
  height: ${($props) => $props.theme.sizes["2xl"]};
  background-color: ${($props) => $props.theme.colors["bg-second"]};
`;

type Props = {
  onCheck: (isChecked: boolean) => void;
  value?: boolean;
} & ComponentPropsWithoutRef<typeof Checkbox>;

const CheckBoxUi = ({ onCheck, value = false, ...rest }: Props) => {
  const [isChecked, setChecked] = useState(value);
  const theme = useTheme();
  const checkBox = () => setChecked((previousState) => !previousState);

  useEffect(() => {
    if (onCheck) onCheck(isChecked);
  }, [isChecked, onCheck]);

  return (
    <StyledCheckBox
      value={isChecked}
      onValueChange={checkBox}
      color={isChecked ? theme.colors["blue-500"] : undefined}
      {...rest}
    />
  );
};

export default CheckBoxUi;
