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
  onSwitch: (isEnabled: boolean, variableValue?: string) => void;
} & ComponentPropsWithoutRef<typeof Switch>;

export const SwitchUi = ({ onSwitch, ...rest }: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const theme = useTheme();

  useEffect(() => {
    onSwitch(isEnabled);
  }, [isEnabled, onSwitch]);

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
