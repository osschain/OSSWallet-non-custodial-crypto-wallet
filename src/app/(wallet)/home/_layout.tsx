import { getHeaderTitle } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { useTheme } from "styled-components/native";

import DefaultHeader from "@/components/layout/DefaultHeader";

export default function _layout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);

          return <DefaultHeader title={title} />;
        },
        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
      }}
    />
  );
}
