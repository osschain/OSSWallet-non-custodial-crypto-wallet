import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import LanguageOptions from "@/components/settings/LanguageOptions";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";

export default function Profile() {
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

  const languages = [
    {
      name: "georgia",
      lng: "ka",
      flag: "https://img.freeflagicons.com/thumb/round_icon/georgia/georgia_640.png",
    },
    {
      name: "English",
      lng: "en",
      flag: "https://img.freeflagicons.com/thumb/round_icon/united_kingdom/united_kingdom_640.png",
    },
    {
      name: "Spanish",
      lng: "es",
      flag: "https://img.freeflagicons.com/thumb/round_icon/spain/spain_640.png",
    },
    {
      name: "portugal",
      lng: "pt",
      flag: "https://img.freeflagicons.com/thumb/round_icon/portugal/portugal_640.png",
    },
    {
      name: "China",
      lng: "cn",
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
        <Link href="/(wallet)/profile/change-pass-code" asChild>
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
                    {t("wallet.profile.change-passcode")}
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
            <LanguageOptions
              languages={languages}
              ref={bottomSheetRef}
              onSelect={handleLanguageChange}
            />
          </Setting>
        </TouchableOpacity>
      </SpacerUi>
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
