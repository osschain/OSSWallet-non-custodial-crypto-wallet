import styled, { useTheme } from "styled-components/native";
import HelpCenter from "@/components/settings/HelpCenter";
import LanguageSetting from "@/components/settings/LanguageSetting";
import NotificationSetting from "@/components/settings/NotificationSetting";
import PasswordSeting from "@/components/settings/PasswordSetting";
import SocialLinks from "@/components/settings/SocialLinks";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { View } from "react-native";

export default function Settings() {
  const theme = useTheme();
  return (
    <ScrollContainerUi>
      <SpacerUi>
        <NotificationSetting />
      </SpacerUi>
      <SpacerUi size="xl">
        <PasswordSeting />
      </SpacerUi>
      <SpacerUi size="xl">
        <LanguageSetting />
      </SpacerUi>
      <SpacerUi size="xl">
        <Line />
        <HelpCenter />
      </SpacerUi>
      <SpacerUi size="xl">
        <Line />
        <SocialLinks />
      </SpacerUi>
      <SpacerUi size="xl" />
    </ScrollContainerUi>
  );
}
const Line = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;
