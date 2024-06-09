import { Blockchain } from "@ankr.com/ankr.js";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { useNft } from "@/app/api/nft";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function Nft() {
  const { nftSlug, blockchain, tokenId } = useLocalSearchParams();
  const {
    data: nft,
    isLoading,
    isError,
  } = useNft(nftSlug as string, blockchain as Blockchain, tokenId as string);

  const properties = useMemo(
    () => [
      { label: "Contract Address", value: nftSlug },
      { label: "Token Id", value: tokenId },
      { label: "Network", value: blockchain },
      { label: "Contract Type", value: nft?.contractType },
    ],
    [nftSlug, tokenId, blockchain, nft?.contractType]
  );

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
          {properties.map((prop, index) => (
            <SpacerUi key={index} size="xl">
              <NftPropertyHeader>{prop.label}</NftPropertyHeader>
              <NftPropertyValue weight="medium" color="text-second">
                {prop.value}
              </NftPropertyValue>
            </SpacerUi>
          ))}
        </ContainerUi>
      </BodyUi>
      <Footer marginSize="sm">
        <ButtonUi>Transfer</ButtonUi>
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
