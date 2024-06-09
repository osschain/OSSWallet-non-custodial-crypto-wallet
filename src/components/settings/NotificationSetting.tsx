import { useTranslation } from "react-i18next";

import { Right, Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";
import { SwitchUi } from "../ui/SwitchUi";

const NotificationSetting = () => {
  const { t } = useTranslation();
  return (
    <Setting>
      <Left>
        <Icon>
          <IconUi
            library="Ionicons"
            name="notifications"
            size="xl"
            color="icon-primary"
          />
        </Icon>
        <Title>
          <BodyTextUi weight="medium" size="md">
            {t("shared.notification")}
          </BodyTextUi>
        </Title>
      </Left>
      <Right>
        <SwitchUi onSwitch={() => {}} />
      </Right>
    </Setting>
  );
};

export default NotificationSetting;
