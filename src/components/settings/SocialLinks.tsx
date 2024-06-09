import { Linking, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Right, Left, Setting, Title, Icon } from "./style";
import BodyTextUi from "../ui/BodyTextUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import IconUi from "../ui/IconUi";
import SpacerUi from "../ui/SpacerUi";

const socials = [
  {
    icon: "twitter",
    label: "Twitter",
    link: "https://twitter.com/osschain",
  },
  {
    icon: "telegram",
    label: "Telegram",
    link: "https://t.me/osschain",
  },
  {
    icon: "discord",
    label: "Discord",
    link: "https://discord.gg/nRehVPnFxq",
  },

  {
    icon: "linkedin",
    label: "Linkedin",
    link: "https://www.linkedin.com/company/osschain-com-ecosystem",
  },
  {
    icon: "message",
    label: "Forum",
    link: "https://forum.osschain.com/",
  },
];

const SocialLinks = () => {
  return (
    <>
      <SpacerUi size="4xl">
        <HeaderTextUi style={{ textAlign: "center" }} weight="semi" size="md">
          SOCIAL LINKS
        </HeaderTextUi>
      </SpacerUi>
      {socials.map((social) => {
        return (
          <SpacerUi size="xl" key={social.label}>
            <TouchableOpacity onPress={() => Linking.openURL(social.link)}>
              <Setting>
                <Left>
                  <Icon>
                    <IconUi
                      library="FontAwesome6"
                      name={social.icon}
                      size="xl"
                      color="icon-primary"
                    />
                  </Icon>
                  <Title>
                    <BodyTextUi weight="medium" size="md">
                      {social.label}
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

export default SocialLinks;
