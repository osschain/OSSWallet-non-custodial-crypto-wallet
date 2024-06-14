import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Right, Left, Setting, Title, Icon } from "./style";

import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";

const HelpCenter = () => {
  const { t } = useTranslation();

  const termsAndConditions = useMemo(() => {
    return [
      {
        icon: "support-agent",
        label: t("wallet.settings.index.support"),
        link: "https://support.osschain.com/",
      },
      {
        icon: "policy",
        label: t("wallet.settings.index.terms-and-conditions"),
        link: "https://law.osschain.com/terms/index.html",
      },
      {
        icon: "local-police",
        label: t("wallet.settings.index.privacy-policy"),
        link: "https://law.osschain.com/privacy/",
      },
    ];
  }, []);
  return (
    <>
      {termsAndConditions.map((term, index) => {
        return (
          <SpacerUi size="xl" key={term.label}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/web-view`,
                  params: { link: term.link, label: term.label },
                })
              }
            >
              <Setting>
                <Left>
                  <Icon>
                    <IconUi
                      library="MaterialIcons"
                      // @ts-ignore
                      name={term.icon}
                      size="xl"
                      color="icon-primary"
                    />
                  </Icon>
                  <Title>
                    <BodyTextUi weight="medium" size="md">
                      {term.label}
                    </BodyTextUi>
                  </Title>
                </Left>
                <Right>
                  <IconUi
                    library="Feather"
                    name="external-link"
                    size="xl"
                    color="icon-second"
                  />
                </Right>
              </Setting>
            </TouchableOpacity>
          </SpacerUi>
        );
      })}
    </>
  );
};

export default HelpCenter;
