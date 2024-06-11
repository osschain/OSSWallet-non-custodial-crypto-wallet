import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";

import { Notification } from "@/@types/notification";
import IosHeaderLeft from "@/components/layout/IosHeaderLeft";

export default function _layout() {
  const theme = useTheme();

  useEffect(() => {
    checkNotificaitons();
  }, []);

  const checkNotificaitons = async () => {
    AsyncStorage.removeItem("notifications");
    const lastChecked = await AsyncStorage.getItem("lastNotificationsCheck");
    const isRecent =
      lastChecked && Date.now() - Number(lastChecked) < 4 * 60 * 60 * 1000;

    const cachedNotificationsStr = await AsyncStorage.getItem("notifications");
    const cachedNotifications = cachedNotificationsStr
      ? (JSON.parse(cachedNotificationsStr) as Notification[])
      : [];

    const cachedNotificationIds = cachedNotifications.map(
      (notification) => notification.id
    );

    if (isRecent && cachedNotifications.length > 0) {
      return cachedNotifications;
    }

    const response = await fetch(
      "https://assets.osschain.com/notification.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const notifications = data.notifications as Notification[];

    if (!notifications) {
      throw new Error("No notifications found in the response");
    }

    const newNotificationIds = notifications.map(
      (notification) => notification.id
    );
    const areNotificationsDifferent = newNotificationIds.some(
      (id) => !cachedNotificationIds.includes(id)
    );

    if (areNotificationsDifferent) {
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
      );
      await AsyncStorage.setItem(
        "lastNotificationsCheck",
        JSON.stringify(Date.now())
      );
      let count = 0;

      if (cachedNotifications) {
        const newNotificationsCount = notifications.filter(
          (notification) => !cachedNotificationIds.includes(notification.id)
        ).length;
        count = newNotificationsCount;
      }
      await AsyncStorage.setItem("notificationNumber", JSON.stringify(count));
    } else {
      const newNotificationsCount = 0;
      await AsyncStorage.setItem(
        "notificationNumber",
        JSON.stringify(newNotificationsCount)
      );
    }
  };
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (Platform.OS === "ios" ? <IosHeaderLeft /> : null),

        contentStyle: {
          backgroundColor: theme.colors["bg-primary"],
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="recieve" options={{ headerShown: false }} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="asset" options={{ headerShown: false }} />
      <Stack.Screen name="swap" options={{ headerShown: false }} />
      <Stack.Screen name="nft" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />

      <Stack.Screen name="custom-token" options={{ headerShown: false }} />
    </Stack>
  );
}
