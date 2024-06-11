import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {

            const notificationsStr = await AsyncStorage.getItem('notifications')

            if (!notificationsStr) {
                throw new Error()
            }

            const notifications = JSON.parse(notificationsStr)
            console.log("OK")
            if (notifications) {
                AsyncStorage.setItem("notificationNumber", JSON.stringify(0))
                await queryClient.invalidateQueries({ queryKey: ["notificationsNum"] });
            }

            return notifications
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

};

export const useNotificationsNum = () => {
    return useQuery({
        queryKey: ["notificationsNum"],
        queryFn: async () => {

            const notificationsStr = await AsyncStorage.getItem('notificationNumber')

            if (!notificationsStr) {
                throw new Error()
            }

            const notifications = JSON.parse(notificationsStr)


            return notifications
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

};
