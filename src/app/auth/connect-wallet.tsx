import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";

const seedPhraseSchema = Yup.string()
  .required("Seed phrase is required")
  .trim() // Remove leading/trailing whitespace
  .matches(/^\s*(\w+\s){11}\w+\s*$/, "Invalid seed phrase format") // 12 words separated by spaces
  .test("validWords", "Invalid words found in seed phrase", (value) => {
    const words = value.split(" ");
    return words.every((word) => {
      // Use a comprehensive BIP-39 word list for validation
      return Yup.ref("bip39Words");
    });
  });

function ConnetWallet() {
  const [seed, setSeed] = useState<string>("");
  const { addSeed } = useAuth();

  const handleConnectWallet = () => {
    const testString =
      "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12";

    seedPhraseSchema
      .validate(testString)
      .then((valid) => {
        addSeed(valid.trim());
        router.push("/auth/password-setup");
      })
      .catch(() => {
        Alert.alert(
          "ops...",
          "Seed Phrase does not have correct format, make sure to put 12 word and remove extra spaces"
        );
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SpacerUi size="4xl" />
      <Body>
        <Logo
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText adjustsFontSizeToFit size="2xl" weight="extra">
            Enter the secret key
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            To restore access, enter the 24 secret words you received when
            creating a wallet
          </DescriptionText>
        </SpacerUi>
        <SpacerUi size="2xl">
          <TextAreaInputUi
            value={seed}
            onChangeText={(text) => setSeed(text)}
            multiline
            numberOfLines={10}
            right={<Ionicons name="scan" size={24} color="black" />}
          />
        </SpacerUi>
      </Body>

      <Footer>
        <Continue onPress={handleConnectWallet}>Connect Wallet</Continue>
      </Footer>
    </ScrollView>
  );
}

const Body = styled.View`
  flex: 1;
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

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Continue = styled(ButtonUi)``;

export default ConnetWallet;
