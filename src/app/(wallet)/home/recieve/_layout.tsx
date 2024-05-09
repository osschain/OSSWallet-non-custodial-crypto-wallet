import { getHeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import SecondHeader from "@/components/layout/SecondHeader";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return <SecondHeader title={title} />;
        },
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Recieve" }} />
    </Stack>
  );
}