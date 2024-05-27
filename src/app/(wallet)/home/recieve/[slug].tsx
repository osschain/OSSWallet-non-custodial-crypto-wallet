import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAsset } from "@/providers/AssetProvider";

export default function RecieveDetails() {
  const { slug } = useLocalSearchParams();
  const { t } = useTranslation();
  const { assets } = useAsset();
  const asset = assets?.find((asset) => asset.id === slug);

  if (!assets || !asset) {
    return (
      <SpacerUi>
        <MessageUi>t("shared.asset-error")</MessageUi>
      </SpacerUi>
    );
  }

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `Recieve ${asset?.name}` }} />
      <BodyUi>
        <SpacerUi size="3xl">
          <MessageUi>
            {asset?.name} {t("wallet.home.recieve.recieve-details.warning")}
          </MessageUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <QrContainer>
            <HeaderTextUi weight="medium" size="xl">
              {t("wallet.home.recieve.recieve-details.qr-code")}
            </HeaderTextUi>
            <Qr>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={require("@/assets/images/qr.png")}
              />
            </Qr>
          </QrContainer>
        </SpacerUi>
        <SpacerUi size="2xl">
          <AdressContainer>
            <HeaderTextUi>
              {t("wallet.home.recieve.recieve-details.wallet-adress")}
            </HeaderTextUi>
            <SpacerUi size="lg">
              <Adress>{asset?.wallet.address}</Adress>
            </SpacerUi>
          </AdressContainer>
        </SpacerUi>
      </BodyUi>

      <Footer marginSize="sm">
        <Button
          variant="primary"
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
        </Button>
        <Button
          variant="secondary"
          icon={
            <IconUi
              library="Feather"
              name="copy"
              size="xl"
              color="icon-second"
            />
          }
        >
          {t("wallet.home.recieve.recieve-details.Copy Address")}
        </Button>
      </Footer>
    </ScrollContainerUi>
  );
}

const Qr = styled.View`
  width: 170px;
  height: 170px;
  padding: ${({ theme }) => theme.spaces["xl"]};
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

const Button = styled(ButtonUi)``;
