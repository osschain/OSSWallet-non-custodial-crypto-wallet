import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { View, Switch } from "react-native";
import styled, { useTheme } from "styled-components/native";

const SwitchContainer = styled(View)`
  justify-content: flex-start;
  align-items: flex-start;
  width: auto;
`;

export const SwitchContainerUi = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof View>) => {
  return <SwitchContainer {...rest}>{children}</SwitchContainer>;
};

type Props = {
  onSwitch: (isEnabled: boolean) => void;
  value?: boolean;
} & ComponentPropsWithoutRef<typeof Switch>;

export const SwitchUi = ({ onSwitch, value = false, ...rest }: Props) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onSwitch(!isEnabled);
  };
  const theme = useTheme();

  return (
    <Switch
      trackColor={{
        false: theme.colors["bg-second"],
        true: theme.colors["blue-500"],
      }}
      thumbColor={
        isEnabled ? theme.colors["pure-white"] : theme.colors["pure-white"]
      }
      style={{
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], // Adjust size here
      }}
      ios_backgroundColor={theme.colors["bg-second"]}
      onValueChange={toggleSwitch}
      value={isEnabled}
      {...rest}
    />
  );
};
