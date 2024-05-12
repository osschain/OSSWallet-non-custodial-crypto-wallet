import { router } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { shuffle } from "@/util/shuffle";
import {
  BodyUi,
  ContainerUi,
  FooterUi,
  ScrollContainerUi,
} from "@/components/ui/LayoutsUi";

const wordsCount = 3;
const seedArrayWithOrder = (seed: string) => {
  return seed
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      return {
        word,
        order: index + 1,
      };
    });
};

const getRandomWords = (seed: string) => {
  const seedArray = seedArrayWithOrder(seed);
  const shuffledSeed = shuffle(seedArray);
  return shuffledSeed.slice(0, wordsCount);
};

const inputResults = Array(wordsCount).fill(false);

function SeedChecking() {
  const { i18n } = useLanguage();

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
      router.push("auth/password-setup");
    } else {
      Alert.alert(
        i18n.t("shared.error-label"),
        i18n.t("auth.seed-checking.checking-error")
      );
    }
  };

  return (
    <ScrollContainerUi>
      <SpacerUi size="xl" />
      <Body>
        <Logo
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText size="3xl" weight="extra">
            {i18n.t("auth.seed-checking.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {i18n.t("auth.seed-checking.description")} {words[0].order},{" "}
            {words[1].order} {i18n.t("shared.and")} {words[2].order}
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
          <Continue onPress={onContinuePress}>
            {i18n.t("shared.continue")}
          </Continue>
        </SpacerUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const Body = styled(BodyUi)`
  justify-content: center;
`;

const Logo = styled.Image`
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

const Continue = styled(ButtonUi)``;

const TextInput = styled(TextInputUi)``;

export default SeedChecking;
