import { Blockchain } from "@ankr.com/ankr.js";
import { Link, useLocalSearchParams } from "expo-router";
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
import { PropertyUi } from "@/components/ui/PropertyUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function Nft() {
  const { t } = useTranslation();

  const {
    nftSlug: contractAddress,
    blockchain,
    tokenId,
  } = useLocalSearchParams();
  const {
    data: nft,
    isLoading,
    isError,
  } = useNft(
    contractAddress as string,
    blockchain as Blockchain,
    tokenId as string
  );

  const properties = [
    {
      label: t("wallet.home.nft.slug.contract-address"),
      value: contractAddress,
      copy: true,
    },
    {
      label: t("wallet.home.nft.slug.token-id"),
      value: tokenId,
      copy: true,
    },
    { label: t("shared.network"), value: blockchain },
    {
      label: t("wallet.home.nft.slug.contract-type"),
      value: nft?.contractType,
    },
  ];

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
    <ScrollView style={{ flex: 1 }}>
      <BodyUi>
        <Image source={{ uri: nft?.imageUrl }} resizeMode="cover" />
        <ContainerUi>
          <SpacerUi size="lg">
            <HeaderTextUi size="md">{nft?.name}</HeaderTextUi>
          </SpacerUi>
          <SpacerUi size="sm">
            <BodyTextUi weight="light" color="text-second">
              {nft?.description}
            </BodyTextUi>
          </SpacerUi>
          <SpacerUi size="xl">
            {properties.map((prop) => (
              <SpacerUi key={prop.label} size="lg">
                <PropertyUi
                  label={prop.label}
                  value={prop.value as string}
                  copy={prop.copy}
                />
              </SpacerUi>
            ))}
          </SpacerUi>
        </ContainerUi>
      </BodyUi>
      <Footer marginSize="sm">
        <Link
          href={{
            pathname: `/(wallet)/home/nft/transfer/${contractAddress}`,
            params: {
              blockchain,
              tokenId,
              contractType: nft?.contractType,
              name: nft?.name,
            },
          }}
          asChild
        >
          <ButtonUi>{t("shared.transfer")}</ButtonUi>
        </Link>
      </Footer>
    </ScrollView>
  );
}

const Footer = styled(FooterUi)`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
