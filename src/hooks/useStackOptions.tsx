import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

export function useStackOptions(options: NativeStackNavigationOptions = {}) {
  const theme = useTheme();

  return ({
    route,
    navigation,
  }: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }): NativeStackNavigationOptions => {
    return {
      headerShadowVisible: false,
      headerStyle: { backgroundColor: theme.colors["bg-primary"] },
      headerTitleAlign: "center", // Must match "center" | "left" | undefined
      headerTintColor: theme.colors["text-primary"],
      headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),
      contentStyle: {
        backgroundColor: theme.colors["bg-primary"],
      },
      ...options,
    };
  };
}
