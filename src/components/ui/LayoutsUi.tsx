import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const ContainerUi = styled.View`
  flex: 1;
  margin-top: ${({ theme }) => theme.spaces["md"]};
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

export const AnimatedContainerUi = styled(Animated.View)`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

export const BodyUi = styled.View`
  flex: 1;
`;

type MarginSize = "sm" | "lg";

export const FooterUi = styled(View)<{ marginSize?: MarginSize }>`
  margin: ${({ theme, marginSize = "lg" }) =>
      marginSize === "sm" ? theme.spaces["2xl"] : theme.spaces["4xl"]}
    0;
`;

export const ScrollContainerUi = ({ children }: { children: ReactNode }) => {
  return (
    <ContainerUi>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ContainerUi>
  );
};
