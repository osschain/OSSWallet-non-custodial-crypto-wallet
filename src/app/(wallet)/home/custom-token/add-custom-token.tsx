import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { defaultImage } from "@/util/DefaultImage";
import { networks } from "@/util/mock";

const details = [
  {
    title: "symbol",
    value: "TGR",
  },
  {
    title: "Name",
    value: "Tegro",
  },
  {
    title: "Decimals",
    value: "18",
  },
];
export default function AddCustomToken() {
  const [adress, setAdress] = useState("");
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["95%", "95%"], []);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const approveToken = useRef<BottomSheetModal>(null);
  const networkModal = useRef<BottomSheetModal>(null);

  const handlePresentNetworkModal = () => {
    networkModal.current?.present();
  };

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
      <NetworkOptions
        ref={networkModal}
        networks={networks}
        onSelect={() => {}}
      />
      <BodyUi>
        <SpacerUi>
          <NetworkButton onPress={handlePresentNetworkModal}>
            {t("shared.all")} {t("shared.network")}
          </NetworkButton>
        </SpacerUi>
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
        <SpacerUi size="3xl">
          <TokenDetails>
            <Row>
              <LeftDetail>
                <BodyTextUi weight="medium">icon:</BodyTextUi>
              </LeftDetail>
              <RightDetail>
                <Image source={{ uri: defaultImage }} width={24} height={24} />
              </RightDetail>
            </Row>
            {details.map(({ title, value }) => (
              <SpacerUi size="xl">
                <Row>
                  <LeftDetail>
                    <BodyTextUi weight="medium">{title}:</BodyTextUi>
                  </LeftDetail>
                  <RightDetail>
                    <BodyTextUi weight="medium" color="text-second">
                      {value}
                    </BodyTextUi>
                  </RightDetail>
                </Row>
              </SpacerUi>
            ))}
          </TokenDetails>
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

const TokenDetails = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

const LeftDetail = styled.View``;

const RightDetail = styled.View``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
