import { useTranslation } from "react-i18next";

import { Right, Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";
import { SwitchUi } from "../ui/SwitchUi";

import { useStyledTheme } from "@/providers/StyledThemeProvider";

const DarkModeSetting = () => {
  const { t } = useTranslation();
  const { toggleTheme } = useStyledTheme();
  const handleDarkModeToggle = (isEnabled: boolean) => {
    toggleTheme();
  };
  return (
    <Setting>
      <Left>
        <Icon>
          <IconUi
            library="MaterialIcons"
            name="dark-mode"
            size="xl"
            color="icon-primary"
          />
        </Icon>
        <Title>
          <BodyTextUi weight="medium" size="md">
            {t("shared.dark-mode")}
          </BodyTextUi>
        </Title>
      </Left>
      <Right>
        <SwitchUi onSwitch={handleDarkModeToggle} />
      </Right>
    </Setting>
  );
};

export default DarkModeSetting;
