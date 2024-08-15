import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Mnemonic } from "ethers";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";

function ConnetWallet() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const { addMnemonic, addIsImporting } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    addIsImporting(true);
  }, [addIsImporting]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const validateMnemonic = (mnemonic: string) => {
    return Mnemonic.isValidMnemonic(mnemonic);
  };

  const scannerHandler = async (data: string) => {
    const isValidate = validateMnemonic(data);
    bottomSheetRef.current?.close();

    if (isValidate) {
      setMnemonic(data);
    } else {
      Alert.alert(
        t("shared.error-label"),
        t("auth.connect-wallet.scannned-error")
      );
    }
  };

  const handleConnectWallet = () => {
    const isValidate = validateMnemonic(mnemonic);

    if (isValidate) {
      addMnemonic(mnemonic.trim());
      router.push("/auth/password-setup");
    } else {
      Alert.alert(
        t("shared.error-label"),
        t("auth.connect-wallet.format-error")
      );
    }
  };

  return (
    <ScrollContainerUi>
      <ScannerModalUi ref={bottomSheetRef} onBarcodeScanner={scannerHandler} />

      <SpacerUi size="xl" />
      <Body>
        <BannerImage source={require("@/assets/images/cpu.png")} />
        <SpacerUi size="3.5xl">
          <HeaderText
            accessibilityLabel="Enter the Secret Key"
            adjustsFontSizeToFit
          >
            {t("auth.connect-wallet.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("auth.connect-wallet.description")}
          </DescriptionText>
        </SpacerUi>
        <SpacerUi size="2xl">
          <TextAreaInputUi
            value={mnemonic}
            multiline
            onChangeText={(text) => setMnemonic(text)}
            autoCapitalize="none"
            right={
              <IconUi
                library="Ionicons"
                name="scan"
                size="xl"
                color="icon-second"
                onPress={handlePresentModalPress}
              />
            }
          />
        </SpacerUi>
      </Body>

      <Footer>
        <ButtonUi onPress={handleConnectWallet}>
          {t("auth.connect-wallet.connect-wallet")}
        </ButtonUi>
      </Footer>
    </ScrollContainerUi>
  );
}

const Body = styled.View`
  flex: 1;
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

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

export default ConnetWallet;
