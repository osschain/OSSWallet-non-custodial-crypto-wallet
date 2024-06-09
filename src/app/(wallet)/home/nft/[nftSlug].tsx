import { Blockchain } from "@ankr.com/ankr.js";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { useNft } from "@/app/api/nft";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import {
  BodyUi,
  ContainerUi,
  FooterUi,
  ScrollContainerUi,
} from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";

export default function Nft() {
  const { t } = useTranslation();
  const { nftSlug, blockchain, tokenId } = useLocalSearchParams();
  const {
    data: nft,
    isLoading,
    isError,
  } = useNft(nftSlug as string, blockchain as Blockchain, tokenId as string);
  if (isLoading) {
    return (
      <SpacerUi>
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  if (isError) {
    return <AlertWithImageUI title="Sorry can't Find details" />;
  }
  return (
    <ScrollView style={{ flexBasis: 1 }}>
      <Stack.Screen options={{ title: "NFT" }} />
      <BodyUi>
        <Image source={{ uri: nft?.imageUrl }} resizeMode="cover" />
        <ContainerUi>
          <SpacerUi size="lg">
            <HeaderTextUi size="xl">{nft?.name}</HeaderTextUi>
          </SpacerUi>
          <SpacerUi size="sm">
            <BodyTextUi weight="medium" color="text-second">
              {nft?.description}
            </BodyTextUi>
          </SpacerUi>
          <SpacerUi size="xl">
            <NftPropertyHeader>Contract Address</NftPropertyHeader>
            <NftPropertyValue weight="medium" color="text-second">
              {nftSlug}
            </NftPropertyValue>
          </SpacerUi>
          <SpacerUi>
            <NftPropertyHeader>Token Id</NftPropertyHeader>
            <NftPropertyValue weight="medium" color="text-second">
              {tokenId}
            </NftPropertyValue>
          </SpacerUi>
          <SpacerUi>
            <NftPropertyHeader>Network</NftPropertyHeader>
            <NftPropertyValue weight="medium" color="text-second">
              {blockchain}
            </NftPropertyValue>
          </SpacerUi>
          <SpacerUi>
            <NftPropertyHeader>Contract Type</NftPropertyHeader>
            <NftPropertyValue weight="medium" color="text-second">
              {nft?.contractType}
            </NftPropertyValue>
          </SpacerUi>
        </ContainerUi>
      </BodyUi>
      <Footer marginSize="sm">
        <ButtonUi>{t("shared.transfer")}</ButtonUi>
      </Footer>
    </ScrollView>
  );
}

const NftPropertyHeader = styled(HeaderTextUi)``;
const NftPropertyValue = styled(BodyTextUi)``;

const Footer = styled(FooterUi)`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
