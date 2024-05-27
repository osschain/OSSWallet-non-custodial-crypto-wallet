import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { shuffle } from "@/util/shuffle";

const wordsCount = 3;
const mnemonicArrayWithOrder = (mnemonic: string) => {
  return mnemonic
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      return {
        word,
        order: index + 1,
      };
    });
};

const getRandomWords = (mnemonic: string) => {
  const seedArray = mnemonicArrayWithOrder(mnemonic);
  const shuffledSeed = shuffle(seedArray);
  return shuffledSeed.slice(0, wordsCount);
};

const inputResults = Array(wordsCount).fill(false);

export default function MnemonicChecking() {
  const { t } = useTranslation();

  const { seed } = useAuth();
  const words = getRandomWords(seed as string);

  const checkWord = (text: string, word: string, index: number) => {
    const isMatch = text.toLowerCase() === word.toLowerCase();
    inputResults[index] = isMatch;
  };

  const onContinuePress = () => {
    const allWordsMatched = inputResults.every((result) => result);

    if (allWordsMatched) {
      // todo remove it after create password setup
      router.push("/auth/password-setup");
    } else {
      Alert.alert(
        t("shared.error-label"),
        t("auth.seed-checking.checking-error")
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollContainerUi>
        <SpacerUi size="xl" />
        <Body>
          <BannerImage
            resizeMode="contain"
            source={require("@/assets/images/cpu.png")}
          />
          <SpacerUi size="3.5xl">
            <HeaderText size="3xl" weight="bold">
              {t("auth.seed-checking.header")}
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              {t("auth.seed-checking.description")} {words[0].order},{" "}
              {words[1].order} {t("shared.and")} {words[2].order}
            </DescriptionText>
          </SpacerUi>

          <SpacerUi>
            {words?.map(
              (
                { word, order }: { word: string; order: number },
                index: number
              ) => (
                <SpacerUi size="xl" key={order}>
                  <TextInputUi
                    left={
                      <View>
                        <BodyTextUi color="text-second" weight="medium">
                          {order} .
                        </BodyTextUi>
                      </View>
                    }
                    onChangeText={(text) => checkWord(text, word, index)}
                  />
                </SpacerUi>
              )
            )}
          </SpacerUi>
        </Body>
        <FooterUi>
          <SpacerUi size="2xl">
            <ButtonUi onPress={onContinuePress}>
              {t("shared.continue")}
            </ButtonUi>
          </SpacerUi>
        </FooterUi>
      </ScrollContainerUi>
    </KeyboardAvoidingView>
  );
}

const Body = styled(BodyUi)`
  justify-content: center;
`;

const BannerImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const HeaderText = styled(HeaderTextUi)`
  text-align: center;
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;
