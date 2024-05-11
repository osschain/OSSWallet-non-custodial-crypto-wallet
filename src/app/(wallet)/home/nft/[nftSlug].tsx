import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { nfts } from "@/util/mock";

export default function Nft() {
  const { nftSlug: slug } = useLocalSearchParams();

  const nft = nfts.find((asset) => asset.id === Number(slug as string));

  return (
    <>
      <Stack.Screen options={{ title: nft?.title }} />
      <Body>
        <ScrollView>
          <Image
            source={require("@/assets/images/nftDefaultIMage.png")}
            resizeMode="cover"
          />
          <Container>
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
          </Container>
        </ScrollView>
      </Body>
      <Footer>
        <ButtonUi>Transfer</ButtonUi>
      </Footer>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;
const Body = styled.View`
  flex: 1;
`;
const Footer = styled.View`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  margin: ${({ theme }) => theme.spaces["2xl"]} 0;
`;

const Image = styled.Image`
  width: 100%;
  height: 300px;
`;
