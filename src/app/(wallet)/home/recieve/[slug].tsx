import * as Clipboard from "expo-clipboard";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Share, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAsset } from "@/providers/AssetProvider";

export default function RecieveDetails() {
  const [isCopied, setIsCopied] = useState(false);
  const { slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const { assets } = useAsset();
  const asset = assets?.find((asset) => asset.name === slug);

  if (!assets || !asset) {
    return (
      <SpacerUi>
        <MessageUi>t("shared.asset-error")</MessageUi>
      </SpacerUi>
    );
  }

  const copyHandler = async () => {
    await Clipboard.setStringAsync(asset.account.address);
    setIsCopied(true);
  };

  const shareHandler = async () => {
    await Share.share({ message: asset.account.address });
  };

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `Recieve ${asset?.name}` }} />
      <BodyUi>
        <SpacerUi size="sm">
          <MessageUi>
            {asset?.name} {t("wallet.home.recieve.recieve-details.warning")}
          </MessageUi>
        </SpacerUi>
        <SpacerUi size="xl">
          <QrContainer>
            <HeaderTextUi weight="medium" size="xl">
              {t("wallet.home.recieve.recieve-details.qr-code")}
            </HeaderTextUi>
            <Qr>
              <View>
                <QRCode size={140} value={asset.account.address} />
              </View>
            </Qr>
          </QrContainer>
        </SpacerUi>
        <SpacerUi size="xl">
          <AdressContainer>
            <HeaderTextUi>
              {t("wallet.home.recieve.recieve-details.wallet-adress")}
            </HeaderTextUi>
            <SpacerUi size="lg">
              <Adress>{asset?.account.address}</Adress>
            </SpacerUi>
          </AdressContainer>
        </SpacerUi>
      </BodyUi>

      <Footer marginSize="sm">
        <ButtonUi
          variant="primary"
          onPress={shareHandler}
          icon={
            <IconUi
              library="AntDesign"
              name="sharealt"
              size="xl"
              color="icon-primary"
            />
          }
        >
          Share
        </ButtonUi>
        <ButtonUi
          variant="secondary"
          onPress={copyHandler}
          icon={
            <IconUi
              library="Feather"
              name={isCopied ? "check" : "copy"}
              size="xl"
              color="icon-second"
            />
          }
        >
          {t("wallet.home.recieve.recieve-details.Copy Address")}
        </ButtonUi>
      </Footer>
    </ScrollContainerUi>
  );
}

const Qr = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  justify-content: "center";
  align-items: center;
  border: 1px;
  border-radius: ${({ theme }) => theme.sizes["sm"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;

const QrContainer = styled.View`
  width: 170px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;
const AdressContainer = styled.View``;

const Adress = styled(MessageUi)`
  padding: ${({ theme }) => theme.spaces["xl"]};
  border: 1px;
  border-radius: ${({ theme }) => theme.sizes["sm"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;

const Footer = styled(FooterUi)`
  gap: ${({ theme }) => theme.spaces["xl"]};
`;
