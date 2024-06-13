import { Link } from "expo-router";
import { t } from "i18next";
import React from "react";
import { TouchableOpacity } from "react-native";

import { Right, Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import IconUi from "../ui/IconUi";

const PasswordSeting = () => {
  return (
    <Link href="/(wallet)/settings/change-pass-code" asChild>
      <TouchableOpacity>
        <Setting>
          <Left>
            <Icon>
              <IconUi
                library="AntDesign"
                name="lock"
                size="xl"
                color="icon-primary"
              />
            </Icon>
            <Title>
              <BodyTextUi weight="medium" size="md">
                {t("wallet.settings.change-passcode.title")}
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
export default PasswordSeting;
