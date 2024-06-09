import LanguageSetting from "@/components/settings/LanguageSetting";
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
        <PasswordSeting />
      </SpacerUi>
      <SpacerUi size="xl">
        <LanguageSetting />
      </SpacerUi>
      <SocialLinks />
      <SpacerUi size="xl" />
    </ScrollContainerUi>
  );
}
