import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Mnemonic } from "ethers";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";

function ConnetWallet() {
  const [seed, setSeed] = useState<string>("");
  const { addSeed } = useAuth();
  const { i18n } = useLanguage();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const validateSeed = (seed: string) => {
    return Mnemonic.isValidMnemonic(seed);
  };

  const scannerHandler = async (data: string) => {
    const isValidate = validateSeed(data);
    bottomSheetRef.current?.close();

    if (isValidate) {
      setSeed(data);
    } else {
      Alert.alert(
        i18n.t("shared.error-label"),
        i18n.t("auth.connect-wallet.scanned-error")
      );
    }
  };

  const handleConnectWallet = () => {
    const isValidate = validateSeed(seed);

    if (isValidate) {
      addSeed(seed.trim());
      router.push("auth/password-setup");
    } else {
      Alert.alert(
        i18n.t("shared.error-label"),
        i18n.t("auth.connect-wallet.format-error")
      );
    }
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ScannerModalUi
          ref={bottomSheetRef}
          onBarcodeScanner={scannerHandler}
        />

        <SpacerUi size="xl" />
        <Body>
          <Logo
            resizeMode="contain"
            source={require("@/assets/images/cpu.png")}
          />
          <SpacerUi size="3.5xl">
            <HeaderText adjustsFontSizeToFit size="2xl" weight="extra">
              {i18n.t("auth.connect-wallet.header")}
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              {i18n.t("auth.connect-wallet.description")}
            </DescriptionText>
          </SpacerUi>
          <SpacerUi size="2xl">
            <TextAreaInputUi
              value={seed}
              onChangeText={(text) => setSeed(text)}
              multiline
              numberOfLines={10}
              right={
                <Ionicons
                  name="scan"
                  size={24}
                  color="black"
                  onPress={handlePresentModalPress}
                />
              }
            />
          </SpacerUi>
        </Body>

        <Footer>
          <Continue onPress={handleConnectWallet}>
            {i18n.t("auth.connect-wallet.connect-wallet")}
          </Continue>
        </Footer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

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
