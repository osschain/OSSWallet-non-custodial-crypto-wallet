import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFont from "@/hooks/useFonts";
import AuthProvider from "@/providers/AuthProvider";
import { ErrorBoundaryProvider } from "@/providers/ErrorBoundery";
import NothificationProvider from "@/providers/NotificationsProvider";
import QueryProvider from "@/providers/QueryProvider";
import StyledThemeProvider from "@/providers/StyledThemeProvider";

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

  const { i18n } = useTranslation();
  useEffect(() => {
    const bootstrapAsync = async () => {
      const lang = await AsyncStorage.getItem("lang");
      if (lang) {
        i18n.changeLanguage(lang);
      }
    };
    bootstrapAsync();
  }, [i18n]);

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
  const { t } = useTranslation();

  return (
    <>
      <ErrorBoundaryProvider>
        <NothificationProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StyledThemeProvider>
              <AuthProvider>
                <QueryProvider>
                  <BottomSheetModalProvider>
                    <Stack>
                      <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="auth"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(wallet)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="notificationsModal"
                        options={{
                          presentation: "modal",
                          title: t("shared.notification"),
                        }}
                      />
                      <Stack.Screen
                        name="enter-password"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="web-view"
                        options={{ headerShown: false }}
                      />
                    </Stack>
                  </BottomSheetModalProvider>
                </QueryProvider>
              </AuthProvider>
            </StyledThemeProvider>
          </GestureHandlerRootView>
        </NothificationProvider>
      </ErrorBoundaryProvider>
    </>
  );
}
