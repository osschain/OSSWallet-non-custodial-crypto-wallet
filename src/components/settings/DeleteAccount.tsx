import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";

import { useAuth } from "@/providers/AuthProvider";

const DeleteAccount = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    Alert.alert(
      t("wallet.settings.index.delete-account-alert"), // Title or message
      "", // Optional additional message
      [
        {
          text: t("shared.cancel"), // Cancel button text
          style: "cancel", // Style of the button
          onPress: () => console.log("User cancelled logout"), // Action for cancel button
        },
        {
          text: t("shared.confirm"), // Agree button text
          onPress: async () => {
            await logOut(); // Call logOut function
            queryClient.clear(); // Clear the query client
            router.replace("/auth"); // Navigate to the auth page
          },
        },
      ],
      { cancelable: true }
    );
    // queryClient.resetQueries();
    queryClient.clear();
    router.replace("/auth");
  };
  return (
    <TouchableOpacity onPress={logoutHandler}>
      <Setting>
        <Left>
          <Icon>
            <IconUi
              library="AntDesign"
              name="logout"
              size="xl"
              color="icon-primary"
            />
          </Icon>
          <Title>
            <BodyTextUi weight="medium" size="md">
              {t("wallet.settings.index.delete-account")}
            </BodyTextUi>
          </Title>
        </Left>
      </Setting>
    </TouchableOpacity>
  );
};

export default DeleteAccount;
