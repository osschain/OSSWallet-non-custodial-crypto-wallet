import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Right, Left, Setting, Title, Icon } from "./style";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";

const termsAndConditions = [
  {
    icon: "support-agent",
    label: "Support",
    link: "https://support.osschain.com",
  },
  {
    icon: "policy",
    label: "Terms and condition",
    link: "https://law.osschain.com/terms",
  },
  {
    icon: "local-police",
    label: "Privacy Policy",
    link: "https://law.osschain.com/privacy",
  },
];

const HelpCenter = () => {
  return (
    <>
      <SpacerUi size="4xl">
        <HeaderTextUi style={{ textAlign: "center" }} weight="semi" size="md">
          Help Center
        </HeaderTextUi>
      </SpacerUi>
      {termsAndConditions.map((term) => {
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
