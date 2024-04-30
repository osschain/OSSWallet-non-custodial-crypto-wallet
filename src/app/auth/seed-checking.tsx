import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import TextInputUi from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { shuffle } from "@/util/shuffle";

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

const getRandomWords = (seed: string | null) => {
  if (!seed) return;
  const seedArray = seedArrayWithOrder(seed);
  const shuffledSeed = shuffle(seedArray);
  return shuffledSeed.slice(0, wordsCount);
};

const inputResults = Array(wordsCount).fill(false);

function SeedChecking() {
  const { seed } = useAuth();
  const words = getRandomWords(seed);

  const checkWord = (text: string, word: string, index: number) => {
    const isMatch = text.toLowerCase() === word.toLowerCase();
    inputResults[index] = isMatch;
  };

  const allWordsMatched = inputResults.every((result) => result);

  const onContinuePress = () => {
    if (allWordsMatched) {
      // todo remove it after create password setup
      router.push("/auth/password-setup");
    } else {
      router.push("/auth/password-setup");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            justifyContent: "space-between",
          }}
        >
          <SpacerUi size="4xl">
            <Header>
              <Logo
                resizeMode="contain"
                source={require("@/assets/images/cpu.png")}
              />
              <SpacerUi size="3.5xl">
                <HeaderText size="3xl" weight="extra">
                  Let's check
                </HeaderText>
              </SpacerUi>
              <SpacerUi size="xl">
                <DescriptionText size="lg" color="text-second" weight="regular">
                  To make sure you spelled the words correctly, enter words 6,
                  16 and 18
                </DescriptionText>
              </SpacerUi>
            </Header>
            <SpacerUi size="2xl" />
            <Body>
              {words?.map(
                (
                  { word, order }: { word: string; order: number },
                  index: number
                ) => (
                  <SpacerUi size="xl" key={order}>
                    <TextInput
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
            </Body>
          </SpacerUi>

          <Footer>
            <SpacerUi size="2xl">
              <Continue onPress={onContinuePress}>Continue</Continue>
            </SpacerUi>
          </Footer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const Header = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces["4xl"]};
`;
const Body = styled.View``;
const Continue = styled(ButtonUi)``;

const TextInput = styled(TextInputUi)``;

export default SeedChecking;
