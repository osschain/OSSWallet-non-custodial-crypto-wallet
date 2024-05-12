import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";

export default function AddCustomToken() {
  const [adress, setAdress] = useState("");
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["95%", "95%"], []);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const approveToken = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleApproveModalPress = () => {
    approveToken.current?.present();
  };

  const scannerHandler = async (data: string) => {
    bottomSheetRef.current?.close();
    setAdress(data);
  };

  return (
    <ContainerUi>
      <ScannerModalUi ref={bottomSheetRef} onBarcodeScanner={scannerHandler} />
      <BottomSheetModal index={0} snapPoints={snapPoints} ref={approveToken}>
        <ContainerUi>
          <BodyUi>
            <SpacerUi size="xl">
              <HeaderTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-first")}
              </HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-second")}
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-third")}
              </BodyTextUi>
            </SpacerUi>

            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-forth")}
              </BodyTextUi>
            </SpacerUi>
          </BodyUi>
          <FooterUi>
            <ButtonUi>{t("shared.import")}</ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi variant="secondary">{t("shared.cancel")}</ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ContainerUi>
      </BottomSheetModal>
      <BodyUi>
        <SpacerUi size="2xl">
          <TextAreaInputUi
            placeholder="Enter Token Adress"
            value={adress}
            onChangeText={(text) => setAdress(text)}
            multiline
            numberOfLines={5}
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
      </BodyUi>
      <FooterUi marginSize="sm">
        <ButtonUi onPress={handleApproveModalPress}>
          {t("wallet.home.custom-token.add-custom-token.import-token-button")}
        </ButtonUi>
      </FooterUi>
    </ContainerUi>
  );
}
