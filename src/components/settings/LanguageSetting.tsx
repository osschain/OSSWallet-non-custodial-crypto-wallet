import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import LocaleOptions from "./LocaleOptions";
import { Right, Left, Setting, Title, Icon } from "./style";

import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";

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

const LanguageSetting = () => {
  const { i18n, t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleLanguageChange = async (lang: string) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    bottomSheetRef.current?.close();
  };

  return (
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
            <BodyTextUi weight="medium" size="md">
              {t("wallet.settings.index.choose-langnuage")}
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
  );
};

export default LanguageSetting;
