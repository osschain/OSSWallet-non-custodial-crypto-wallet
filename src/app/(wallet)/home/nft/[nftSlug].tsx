import { Blockchain } from "@ankr.com/ankr.js";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { useNft } from "@/app/api/nft";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function Nft() {
  const { nftSlug, blockchain, tokenId } = useLocalSearchParams();
  const { data: nft, isLoading } = useNft(
    nftSlug as string,
    blockchain as Blockchain,
    tokenId as string
  );

  if (isLoading) {
    return (
      <SpacerUi>
        <ActivityIndicator />
      </SpacerUi>
    );
  }
  return (
    <>
      <Stack.Screen options={{ title: nft?.name }} />
      <BodyUi>
        <ScrollView>
          <Image source={{ uri: nft?.imageUrl }} resizeMode="cover" />
          <ScrollContainerUi>
            <SpacerUi size="xl">
              <HeaderTextUi size="2xl">{nft?.name}</HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi size="lg" weight="medium" color="text-second">
                {nft?.description}
              </BodyTextUi>
            </SpacerUi>
          </ScrollContainerUi>
        </ScrollView>
      </BodyUi>
      <Footer marginSize="sm">
        {/* <ButtonUi>{t("shared.transfer")}</ButtonUi> */}
      </Footer>
    </>
  );
}

const Footer = styled(FooterUi)`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
