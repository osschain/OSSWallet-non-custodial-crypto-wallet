import { Blockchain } from "@ankr.com/ankr.js";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { nftSlug, blockchain, tokenId } = useLocalSearchParams();
  const {
    data: nft,
    isLoading,
    isError,
  } = useNft(nftSlug as string, blockchain as Blockchain, tokenId as string);

  const properties = useMemo(
    () => [
      { label: t("wallet.home.nft.slug.contract-address"), value: nftSlug },
      { label: t("wallet.home.nft.slug.token-id"), value: tokenId },
      { label: t("shared.network"), value: blockchain },
      {
        label: t("wallet.home.nft.slug.contract-type"),
        value: nft?.contractType,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    return <AlertWithImageUI title={t("wallet.home.nft.slug.alert-error")} />;
  }

  return (
    <ScrollView style={{ flexBasis: 1 }}>
      <Stack.Screen options={{ title: t("shared.NFT") }} />
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
