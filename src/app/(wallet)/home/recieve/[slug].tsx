import { AntDesign, Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { assets } from "@/util/mock";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
export default function ChainDetails() {
  const { slug } = useLocalSearchParams();
  const asset = assets.find((asset) => asset.id === Number(slug as string));
  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: asset?.title }} />
      <BodyUi>
        <SpacerUi size="3xl">
          <MessageUi>
            Only for {asset?.title} network tokens. Do not send ETC here!
          </MessageUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <QrContainer>
            <HeaderTextUi weight="medium" size="xl">
              QR Code
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
            <HeaderTextUi>Wallet Adress</HeaderTextUi>
            <SpacerUi size="lg">
              <Adress>0x9abC74120e13e7D2B46 cfE8D6796Da317e65658c</Adress>
            </SpacerUi>
          </AdressContainer>
        </SpacerUi>
      </BodyUi>

      <Footer marginSize="sm">
        <Button
          variant="primary"
          icon={<AntDesign name="sharealt" size={20} color="white" />}
        >
          Share
        </Button>
        <Button
          variant="secondary"
          icon={<Feather name="copy" size={20} color="black" />}
        >
          Copy Address
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
