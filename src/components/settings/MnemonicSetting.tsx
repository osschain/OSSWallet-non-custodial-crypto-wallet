import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Left, Setting, Title, Icon, Right } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";

const MnemonicSetting = () => {
  const { t } = useTranslation();
  return (
    <Link href="/(wallet)/settings/check-mnemonic" asChild>
      <TouchableOpacity>
        <Setting>
          <Left>
            <Icon>
              <IconUi
                library="AntDesign"
                name="eye"
                size="xl"
                color="icon-primary"
              />
            </Icon>
            <Title>
              <BodyTextUi weight="medium" size="md">
                {t("wallet.settings.check-mnemonic.title")}
              </BodyTextUi>
            </Title>
          </Left>
          <Right>
            <IconUi
              library="AntDesign"
              name="arrowright"
              size="xl"
              color="icon-second"
            />
          </Right>
        </Setting>
      </TouchableOpacity>
    </Link>
  );
};

export default MnemonicSetting;
