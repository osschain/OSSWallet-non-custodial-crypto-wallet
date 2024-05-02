import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors["bg-primary"] }}
    >
      <Container>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: theme.colors["bg-primary"],
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="seed-creating" options={{ headerShown: false }} />
          <Stack.Screen
            name="seed-back-uping"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="seed-checking" options={{ headerShown: false }} />
          <Stack.Screen
            name="password-setup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="congretulation"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="enter-password"
            options={{ headerShown: false }}
          />
        </Stack>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;
