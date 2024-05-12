import { Stack, useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";

import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { assets } from "@/util/mock";

export default function SendChain() {
  const { slug } = useLocalSearchParams();
  const asset = assets.find((asset) => asset.id === Number(slug as string));
  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: asset?.title }} />
      <BodyUi>
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
      </BodyUi>

      <FooterUi marginSize="sm">
        <Button variant="primary">SEND</Button>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const Button = styled(ButtonUi)``;
