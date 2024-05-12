import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFont from "@/hooks/useFonts";
import AuthProvider from "@/providers/AuthProvider";
// eslint-disable-next-line import/order
import StyledThemeProvider from "@/providers/StyledThemeProvider";

import "react-native-get-random-values";
import "@ethersproject/shims";
import "@/translations/i18n";
import { resources } from "@/translations/resources";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en"];
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded: loaded, fontError: error } = useFont();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StyledThemeProvider>
        <AuthProvider>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(wallet)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="enter-password"
                options={{ headerShown: false }}
              />
            </Stack>
          </BottomSheetModalProvider>
        </AuthProvider>
      </StyledThemeProvider>
    </GestureHandlerRootView>
  );
}
