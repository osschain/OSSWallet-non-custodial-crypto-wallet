import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { defaultImage } from "@/util/DefaultImage";
import { chains } from "@/util/mock";

export default function ChainDetails() {
  const { slug } = useLocalSearchParams();
  const chain = chains.find((chain) => chain.id === Number(slug as string));
  return (
    <Container>
      <Stack.Screen options={{ title: chain?.title }} />
      <Details>
        <ChainDescription>
          <Image source={{ uri: defaultImage }} width={27} height={27} />
          <HeaderTextUi weight="medium" size="xl">
            {chain?.title}
          </HeaderTextUi>
        </ChainDescription>
        <SpacerUi size="2xl">
          <Adress>adress: 0x0b6052931BB4492597D05541...</Adress>
        </SpacerUi>
        <SpacerUi size="xl">
          <Actions>
            <Button variant="secondary">Copy</Button>
            <Button variant="secondary">Share</Button>
          </Actions>
        </SpacerUi>
      </Details>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Details = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ChainDescription = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Adress = styled(MessageUi)``;

const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Button = styled(ButtonUi)`
  width: 45%;
  padding-top: 13px;
  padding-bottom: 13px;
`;
