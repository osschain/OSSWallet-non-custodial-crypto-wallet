import { router } from "expo-router";
import { FlatList, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { useNotifications } from "./api/notifications";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function ModalScreen() {
  const { data: notifications } = useNotifications();

  const handleRouting = (title: string, type: string, url: string) => {
    if (type === "direct") {
      Linking.openURL(url);
    } else if (type === "webview") {
      router.replace({
        pathname: `/web-view`,
        params: { link: url, label: title },
      });
    }
  };

  return (
    <ContainerUi>
      <SpacerUi size="xl" />
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <SpacerUi size="xl" position="bottom">
            <TouchableOpacity
              onPress={() => {
                handleRouting(item.title, item.type, item.url);
              }}
            >
              <NotificationContainer>
                <HeaderTextUi>{item.title}</HeaderTextUi>
                <SpacerUi />
                <BodyTextUi color="text-second">{item.description}</BodyTextUi>
              </NotificationContainer>
            </TouchableOpacity>
          </SpacerUi>
        )}
      />
    </ContainerUi>
  );
}

export const NotificationContainer = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  background-color: ${({ theme }) => theme.colors["bg-third"]};
`;
