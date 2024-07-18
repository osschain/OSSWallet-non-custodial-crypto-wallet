import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import useFont from "@/hooks/useFonts";
import AuthProvider from "@/providers/AuthProvider";
import { ErrorBoundaryProvider } from "@/providers/ErrorBoundery";
import NothificationProvider from "@/providers/NotificationsProvider";
import QueryProvider from "@/providers/QueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import StyledThemeProvider from "@/providers/StyledThemeProvider";
import ButtonUi from "@/components/ui/ButtonUi";

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

// --------------------------------------- ---------------------------------------- //

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const responseListener = useRef<Notifications.Subscription>();
  const notificationListener = useRef<Notifications.Subscription>();

  // effect ---- efffect //

  useEffect(() => {
    // fetch expo push token
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("NOTIFICATON", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response, "RESPOSNE RECIEVED");
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );

      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // effect ---- efffect //

  console.log("TOKEN", expoPushToken);

  // --------------------------------------- ---------------------------------------- //

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
          <StoreProvider>
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
                          name="notification"
                          options={{
                            headerShown: false,
                            presentation: "modal",
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
          </StoreProvider>
        </NothificationProvider>
      </ErrorBoundaryProvider>
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
