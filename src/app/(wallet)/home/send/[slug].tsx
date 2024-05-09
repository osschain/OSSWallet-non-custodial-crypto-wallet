import { AntDesign, Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { chains } from "@/util/mock";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";

export default function SendChain() {
  const { slug } = useLocalSearchParams();
  const chain = chains.find((chain) => chain.id === Number(slug as string));
  return (
    <Container>
      <Stack.Screen options={{ title: chain?.title }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Body>
          <SpacerUi size="3xl">
            <MessageUi>Check Adress Before Send, you cen't refund it</MessageUi>
          </SpacerUi>

          <SpacerUi size="2xl">
            <HeaderTextUi>For Whom</HeaderTextUi>
            <SpacerUi size="lg">
              <TextInputUi placeholder="Enter Adress" />
            </SpacerUi>
          </SpacerUi>
          <SpacerUi size="2xl">
            <SpacerUi size="lg">
              <AssetQuantityInputUi placeholder="Enter Adress" />
            </SpacerUi>
          </SpacerUi>
        </Body>

        <Footer>
          <Button variant="primary">SEND</Button>
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

const AdressContainer = styled.View``;

const Adress = styled(MessageUi)`
  padding: ${({ theme }) => theme.spaces["xl"]};
  border: 1px;
  border-radius: ${({ theme }) => theme.sizes["sm"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["2xl"]} 0;

  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Button = styled(ButtonUi)``;
