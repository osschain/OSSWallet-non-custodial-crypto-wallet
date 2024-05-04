import { Ionicons } from "@expo/vector-icons";
import { Redirect, Stack, router } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
  const theme = useTheme();
  const { encryptedSeed, seed } = useAuth();

  if (encryptedSeed && !seed) {
    return <Redirect href="/enter-password" />;
  }

  if (seed && encryptedSeed) {
    return <Redirect href="/(wallet)" />;
  }

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
            header: () => {
              return (
                <HeaderContainer>
                  <Pressable onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                  </Pressable>
                </HeaderContainer>
              );
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="seed-creating" />
          <Stack.Screen name="seed-back-uping" />
          <Stack.Screen name="seed-checking" />
          <Stack.Screen name="password-setup" />
          <Stack.Screen name="congretulation" />

          <Stack.Screen name="connect-wallet" />
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

const HeaderContainer = styled.View`
  margin-top: ${($props) => $props.theme.spaces["3xl"]};
`;
