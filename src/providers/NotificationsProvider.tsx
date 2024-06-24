import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Notification } from "@/@types/notification";

export enum StorageKeys {
  Notifications = "notifications",
  NotifsFetchTime = "notifsFetchTime",
  NewNotifsNum = "newNotifsNum",
}

type NotificationData = {
  notifs: Notification[] | null;
  newNotifsNumber: number | null;
  setNotifNum: (num: number) => void;
};

const NotificationContext = createContext<NotificationData>({
  notifs: null,
  newNotifsNumber: null,
  setNotifNum: () => {},
});

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [notifs, setNotifs] = useState<Notification[] | null>(null);
  const [newNotifsNumber, setNewNotifsNumber] = useState<number | null>(null);

  const getStoredItem = async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get item with key ${key}:`, error);
      return null;
    }
  };

  const setStoredItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set item with key ${key}:`, error);
    }
  };

  const hasFourHoursPassed = useCallback(async () => {
    const notificationFetchTime = await getStoredItem(
      StorageKeys.NotifsFetchTime
    );
    if (!notificationFetchTime) return true;
    return Date.now() - notificationFetchTime > 4 * 60 * 60 * 1000;
  }, []);

  const fetchNotifs = async () => {
    const response = await fetch(
      "https://assets.osschain.com/notification.json"
    );
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.statusText}`);
    const data = await response.json();
    return data.notifications as Notification[];
  };

  const setupNotifs = useCallback(async () => {
    const [notifications, storedNotifs] = await Promise.all([
      fetchNotifs(),
      getStoredItem(StorageKeys.Notifications),
    ]);

    const newNotifsCount = storedNotifs
      ? notifications.filter(
          (notif) =>
            !storedNotifs.some(
              (stored: { id: string }) => stored.id === notif.id
            )
        ).length
      : notifications.length;

    await setStoredItem(StorageKeys.NewNotifsNum, newNotifsCount);
    await setStoredItem(StorageKeys.Notifications, notifications);
    await setStoredItem(StorageKeys.NotifsFetchTime, Date.now());

    setNotifs(notifications);
    setNewNotifsNumber(newNotifsCount);
  }, []);

  const assignNotifs = useCallback(async () => {
    const [storedNotifs, storedNotifsNum] = await Promise.all([
      getStoredItem(StorageKeys.Notifications),
      getStoredItem(StorageKeys.NewNotifsNum),
    ]);
    setNotifs(storedNotifs);
    setNewNotifsNumber(storedNotifsNum);
  }, []);

  const setNotifNum = useCallback(async (num: number) => {
    setNewNotifsNumber(num);
    await setStoredItem(StorageKeys.NewNotifsNum, 0);
  }, []);

  useEffect(() => {
    (async () => {
      if (await hasFourHoursPassed()) {
        await setupNotifs();
      } else {
        await assignNotifs();
      }
    })();
  }, [hasFourHoursPassed, setupNotifs, assignNotifs]);

  return (
    <NotificationContext.Provider
      value={{ notifs, newNotifsNumber, setNotifNum }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
