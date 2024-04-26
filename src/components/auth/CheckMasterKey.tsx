import { useState } from "react";
import { Alert, View } from "react-native";
import styled from "styled-components/native";

import TextInputUi from "../ui/TextInputUi";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

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
  margin-top: auto;
  margin-bottom: 48px;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Continue = styled(ButtonUi)``;

const TextInput = styled(TextInputUi)``;

type Props = {
  phrases: { label: string; order: number }[];
};

const defaultPhrases = [
  { label: "car", order: 4 },
  { label: "window", order: 7 },
  { label: "home", order: 11 },
];

export default function CheckMasterKey({ phrases = defaultPhrases }: Props) {
  const [inputResults, setInputResults] = useState(
    Array(phrases.length).fill(false)
  );

  const checkPhrase = (text: string, phrase: string, index: number) => {
    const isMatch = text.toLowerCase() === phrase.toLowerCase();
    const newResults = [...inputResults];
    newResults[index] = isMatch;
    setInputResults(newResults);
    return isMatch;
  };

  const allPhrasesMatched = inputResults.every((result) => result);

  const onContinuePress = () => {
    if (allPhrasesMatched) {
      Alert.alert("Title", "nnot working", [
        { text: "It's working", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      Alert.alert("oops!", "Phrases are not correct", [
        { text: "ok", onPress: () => console.log("OK") },
      ]);
    }
  };

  return (
    <>
      <SpacerUi size="4xl" />
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
            To make sure you spelled the words correctly, enter words 6, 16 and
            18
          </DescriptionText>
        </SpacerUi>
      </Header>
      <SpacerUi size="2xl" />
      {phrases.map(({ label, order }, index) => (
        <SpacerUi size="xl" key={order}>
          <TextInput
            left={
              <View>
                <BodyTextUi color="text-second" weight="medium">
                  {order} .
                </BodyTextUi>
              </View>
            }
            onChangeText={(text) => checkPhrase(text, label, index)}
          />
        </SpacerUi>
      ))}

      <Footer>
        <Continue onPress={onContinuePress}>Continue</Continue>
      </Footer>
    </>
  );
}
