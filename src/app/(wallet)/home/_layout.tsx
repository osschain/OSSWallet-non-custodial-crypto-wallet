import { getHeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import DefaultHeader from "@/components/layout/DefaultHeader";
import SecondHeader from "@/components/layout/SecondHeader";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return <DefaultHeader title={title} />;
          },
          contentStyle: {
            backgroundColor: theme.colors["bg-primary"],
          },
          title: "ossWallet",
        }}
      />
      <Stack.Screen name="recieve" options={{ headerShown: false }} />
      <Stack.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
    </Stack>
  );
}
