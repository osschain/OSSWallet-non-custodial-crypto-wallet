import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFont from "@/hooks/useFonts";
import AssetProvider from "@/providers/AssetProvider";
import AuthProvider from "@/providers/AuthProvider";
import StyledThemeProvider from "@/providers/StyledThemeProvider";
import "react-native-get-random-values";
import "@ethersproject/shims";
import "@/translations/i18n";

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
  const { fontsLoaded, fontError } = useFont();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return <RootLayoutNav onLayout={onLayoutRootView} />;
}

function RootLayoutNav({ onLayout }: { onLayout: any }) {
  return (
    <GestureHandlerRootView onLayout={onLayout} style={{ flex: 1 }}>
      <StyledThemeProvider>
        <AuthProvider>
          <AssetProvider>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(wallet)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="enter-password"
                  options={{ headerShown: false }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </AssetProvider>
        </AuthProvider>
      </StyledThemeProvider>
    </GestureHandlerRootView>
  );
}
