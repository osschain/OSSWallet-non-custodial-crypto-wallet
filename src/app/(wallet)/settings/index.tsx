import styled from "styled-components/native";

import DarkModeSetting from "@/components/settings/DarkModeSetting";
import HelpCenter from "@/components/settings/HelpCenter";
import LanguageSetting from "@/components/settings/LanguageSetting";
import LogoOut from "@/components/settings/Logout";
import NotificationSetting from "@/components/settings/NotificationSetting";
import PasswordSeting from "@/components/settings/PasswordSetting";
import SocialLinks from "@/components/settings/SocialLinks";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function Settings() {
  return (
    <ScrollContainerUi>
      <SpacerUi>
        <NotificationSetting />
      </SpacerUi>
      <SpacerUi size="xl">
        <DarkModeSetting />
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
      <SpacerUi size="xl">
        <LogoOut />
      </SpacerUi>

      <SpacerUi size="xl" />
    </ScrollContainerUi>
  );
}
const Line = styled.View`
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;
