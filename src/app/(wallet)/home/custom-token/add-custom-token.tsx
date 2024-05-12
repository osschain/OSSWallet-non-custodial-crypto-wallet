import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";

export default function AddCustomToken() {
  const [adress, setAdress] = useState("");
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
              <HeaderTextUi>Trade at your own risk!</HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                Anyone can create a token, including creating fake versions of
                existing tokens that claim to represent projects.
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi>
                If you purchase this token, you may not be able to sell it back.
              </BodyTextUi>
            </SpacerUi>

            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                Buy adding this as a custom token, you confirm that all further
                interactions with it are at your own risk.
              </BodyTextUi>
            </SpacerUi>
          </BodyUi>
          <FooterUi>
            <ButtonUi>Import</ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi variant="secondary">Cancel</ButtonUi>
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
        <ButtonUi onPress={handleApproveModalPress}>Import Token</ButtonUi>
      </FooterUi>
    </ContainerUi>
  );
}
