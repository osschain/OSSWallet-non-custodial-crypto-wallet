import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { nfts } from "@/util/mock";

export default function Nft() {
  const { nftSlug: slug } = useLocalSearchParams();

  const nft = nfts.find((asset) => asset.blockchain === Number(slug as string));
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: nft?.title }} />
      <BodyUi>
        <ScrollView>
          <Image
            source={require("@/assets/images/nftDefaultIMage.png")}
            resizeMode="cover"
          />
          <ScrollContainerUi>
            <SpacerUi size="xl">
              <HeaderTextUi size="2xl">TON NFT Monkey (3933)</HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="sm">
              <BodyTextUi size="lg" weight="medium" color="text-second">
                Dog Metaverse
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi size="lg" weight="medium" color="text-second">
                TON NFT Tegro Dog is one of the first NFT projects on The Open
                Network blockchain. Dogs from the resistance, as a symbol of
                DEX, who fight for absolute freedom...
              </BodyTextUi>
            </SpacerUi>
          </ScrollContainerUi>
        </ScrollView>
      </BodyUi>
      <Footer marginSize="sm">
        <ButtonUi>{t("shared.transfer")}</ButtonUi>
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
