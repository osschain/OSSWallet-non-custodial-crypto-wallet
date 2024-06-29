import { Blockchain } from "@ankr.com/ankr.js";
import * as Clipboard from "expo-clipboard";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { useNft } from "@/app/api/nft";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import IconUi from "@/components/ui/IconUi"; // Import your Icon component

export default function Nft() {
  const { t } = useTranslation();
  const [isAddressCopied, setisAddressCopied] = useState(false);
  const [isTokenIdCopied, setisTokenIdCopied] = useState(false);

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

  const copyAddress = async () => {
    await Clipboard.setStringAsync(contractAddress as string);
    setisAddressCopied(true);
    setisTokenIdCopied(false);
  };

  const copyTokenId = async () => {
    await Clipboard.setStringAsync(tokenId as string);
    setisTokenIdCopied(true);
    setisAddressCopied(false);
  };

  const properties = useMemo(
    () => [
      {
        label: t("wallet.home.nft.slug.contract-address"),
        value: contractAddress,
        copyHandler: copyAddress,
        isCopied: isAddressCopied,
      },
      {
        label: t("wallet.home.nft.slug.token-id"),
        value: tokenId,
        copyHandler: copyTokenId,
        isCopied: isTokenIdCopied,
      },
      { label: t("shared.network"), value: blockchain },
      {
        label: t("wallet.home.nft.slug.contract-type"),
        value: nft?.contractType,
      },
    ],
    [
      contractAddress,
      tokenId,
      blockchain,
      nft?.contractType,
      t,
      isAddressCopied,
      isTokenIdCopied,
    ]
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
    <ScrollViewContainer>
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
          {properties.map((prop, index) => (
            <SpacerUi key={index} size="xl">
              <NftPropertyHeader size="md">{prop.label}</NftPropertyHeader>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <NftPropertyValue size="sm" weight="medium" color="text-second">
                  {prop.value}{" "}
                </NftPropertyValue>
                {prop.copyHandler && (
                  <IconUi
                    onPress={prop.copyHandler}
                    library="Feather"
                    name={prop.isCopied ? "check" : "copy"}
                    size="lg"
                    color="icon-second"
                  />
                )}
              </View>
            </SpacerUi>
          ))}
        </ContainerUi>
      </BodyUi>
      <Footer marginSize="sm">
        <Link
          href={{
            pathname: `/(wallet)/home/nft/transfer/${contractAddress}`,
            params: {
              blockchain,
              tokenId,
            },
          }}
          asChild
        >
          <ButtonUi>{t("shared.transfer")}</ButtonUi>
        </Link>
      </Footer>
    </ScrollViewContainer>
  );
}

const ScrollViewContainer = styled(ScrollView)`
  flex-basis: 1;
`;

const NftPropertyHeader = styled(HeaderTextUi)``;
const NftPropertyValue = styled(BodyTextUi)``;

const Footer = styled(FooterUi)`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
