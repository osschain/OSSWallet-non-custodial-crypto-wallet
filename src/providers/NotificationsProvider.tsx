import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
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
  setNotifNum: (num: number) => {},
});

export default function NothificationProvider({ children }: PropsWithChildren) {
  const [notifs, setNotifs] = useState<Notification[] | null>(null);
  const [newNotifsNumber, setNewNotifsNumber] = useState<number | null>(null);

  useEffect(() => {
    // AsyncStorage.removeItem("notifsFetchTime");
    // AsyncStorage.removeItem("newNotifsNum");
    // AsyncStorage.removeItem("notifications");
    const bootstrapAsync = async () => {
      const has4hoursPassed = await hasFourHoursPassed();
      if (has4hoursPassed) {
        await setupNotifs();
      } else {
        const notifs = await getNotifsFromStorage();
        setNotifs(notifs);
        const notifsNum = await getNewNotifsNum();
        setNewNotifsNumber(notifsNum);
      }
    };
    bootstrapAsync();
  }, []);

  const hasFourHoursPassed = async () => {
    const notificationFetchTime = await getNotifsFetchTime();

    if (!notificationFetchTime) return true;
    const FOUR_HOURS = 4 * 60 * 60 * 1000;

    const currentTimestamp = Date.now();
    return currentTimestamp - notificationFetchTime > FOUR_HOURS;
  };

  const setNotifNum = (num: number) => {
    setNewNotifsNumber(num);
    AsyncStorage.setItem(StorageKeys.NewNotifsNum, JSON.stringify(0));
  };

  const getNotifsFromStorage = async () => {
    const notifs = await AsyncStorage.getItem(StorageKeys.Notifications);
    if (!notifs) {
      return [];
    }
    return JSON.parse(notifs) as Notification[];
  };

  const getNotifsFetchTime = async () => {
    const notifsFetchTime = await AsyncStorage.getItem(
      StorageKeys.NotifsFetchTime
    );

    return Number(notifsFetchTime);
  };

  const getNewNotifsNum = async () => {
    const notifsNum = await AsyncStorage.getItem(StorageKeys.NewNotifsNum);
    console.log(notifsNum);
    return Number(notifsNum);
  };

  const setupNotifs = async () => {
    const notifications = await fetchNotifs();
    const notifsFromStorage = await getNotifsFromStorage();

    if (notifsFromStorage) {
      const ids1 = notifications.map((notif) => notif.id);
      const ids2 = notifsFromStorage.map((notif) => notif.id);
      const number = ids1.filter((id) => !ids2.includes(id)).length;
      AsyncStorage.setItem(StorageKeys.NewNotifsNum, number.toString());
      setNewNotifsNumber(number);
    } else {
      AsyncStorage.setItem(
        StorageKeys.NewNotifsNum,
        notifications.length.toString()
      );
      setNewNotifsNumber(notifications.length);
    }

    AsyncStorage.setItem(
      StorageKeys.Notifications,
      JSON.stringify(notifications)
    );
    AsyncStorage.setItem(StorageKeys.NotifsFetchTime, Date.now().toString());

    setNotifs(notifications);
  };

  const fetchNotifs = async () => {
    const response = await fetch(
      "https://assets.osschain.com/notification.json"
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    const notifications = data.notifications as Notification[];
    if (!notifications) {
      throw new Error("No notifications found in the response");
    }

    return notifications;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifs,
        newNotifsNumber,
        setNotifNum,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
