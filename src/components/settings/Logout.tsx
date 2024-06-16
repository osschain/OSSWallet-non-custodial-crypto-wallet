import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";

import { useAuth } from "@/providers/AuthProvider";

const LogoOut = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    await logOut();
    queryClient.resetQueries();
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
              {t("shared.logout")}
            </BodyTextUi>
          </Title>
        </Left>
      </Setting>
    </TouchableOpacity>
  );
};

export default LogoOut;
