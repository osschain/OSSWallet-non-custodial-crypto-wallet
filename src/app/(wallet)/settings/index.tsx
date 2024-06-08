import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import LocaleOptions from "@/components/settings/LocaleOptions";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleLanguageChange = async (lang: string) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    bottomSheetRef.current?.close();
  };

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

  const locales = [
    {
      name: "Georgia",
      locale: "ka",
      flag: "https://img.freeflagicons.com/thumb/round_icon/georgia/georgia_640.png",
    },
    {
      name: "English",
      locale: "en",
      flag: "https://img.freeflagicons.com/thumb/round_icon/united_kingdom/united_kingdom_640.png",
    },
    {
      name: "Spanish",
      locale: "es",
      flag: "https://img.freeflagicons.com/thumb/round_icon/spain/spain_640.png",
    },
    {
      name: "portugal",
      locale: "pt",
      flag: "https://img.freeflagicons.com/thumb/round_icon/portugal/portugal_640.png",
    },
    {
      name: "China",
      locale: "cn",
      flag: "https://img.freeflagicons.com/thumb/round_icon/china/china_640.png",
    },
  ];
  return (
    <ScrollContainerUi>
      <SpacerUi>
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
              <BodyTextUi weight="medium" size="lg">
                {t("shared.notification")}
              </BodyTextUi>
            </Title>
          </Left>
          <Right>
            <SwitchUi onSwitch={() => {}} />
          </Right>
        </Setting>
      </SpacerUi>
      <SpacerUi size="xl">
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
                  <BodyTextUi weight="medium" size="lg">
                    {t("wallet.settings.change-passcode")}
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
      </SpacerUi>
      <SpacerUi size="xl">
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Setting>
            <Left>
              <Icon>
                <IconUi
                  library="FontAwesome"
                  name="language"
                  size="xl"
                  color="icon-primary"
                />
              </Icon>
              <Title>
                <BodyTextUi weight="medium" size="lg">
                  Choose Language
                </BodyTextUi>
              </Title>
            </Left>
            <Right>
              <IconUi
                library="AntDesign"
                name="arrowup"
                size="xl"
                color="icon-second"
              />
            </Right>
            <LocaleOptions
              locales={locales}
              ref={bottomSheetRef}
              onSelect={handleLanguageChange}
            />
          </Setting>
        </TouchableOpacity>
      </SpacerUi>
      <SpacerUi size="4xl">
        <HeaderTextUi style={{ textAlign: "center" }} weight="semi" size="lg">
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
                  params: { link: term.link },
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
                    <BodyTextUi weight="medium" size="lg">
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
      <SpacerUi size="4xl">
        <HeaderTextUi style={{ textAlign: "center" }} weight="semi" size="lg">
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
                    <BodyTextUi weight="medium" size="lg">
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
      <SpacerUi size="xl" />
    </ScrollContainerUi>
  );
}

const Setting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spaces["xl"]};

  border-width: 1px;
  border-radius: ${({ theme }) => theme.sizes["md"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;
const Icon = styled.View`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors["blue-500"]};
`;
const Title = styled.View``;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["2xl"]};
`;

const Right = styled.View`
  background-color: "red";
`;
