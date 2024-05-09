import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { defaultImage } from "@/util/DefaultImage";
import { chains } from "@/util/mock";

export default function ChainDetails() {
  const { slug } = useLocalSearchParams();
  const chain = chains.find((chain) => chain.id === Number(slug as string));
  return (
    <Container>
      <Stack.Screen options={{ title: chain?.title }} />
      <SpacerUi size="4xl">
        <MessageUi>
          check adress before send, you can't refund after send {chain?.title}
        </MessageUi>
      </SpacerUi>
      <SpacerUi size="4xl" />
      <Details>
        <ChainDescription>
          <Image source={{ uri: defaultImage }} width={27} height={27} />
          <HeaderTextUi weight="medium" size="xl">
            {chain?.title}
          </HeaderTextUi>
        </ChainDescription>
        <SpacerUi size="2xl">
          <TextInputUi placeholder="write Adress here" />
        </SpacerUi>
        <SpacerUi size="xl">
          <Button variant="secondary">Send</Button>
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
  /* justify-content: center; */
  /* align-items: center; */
`;

const ChainDescription = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Button = styled(ButtonUi)`
  padding-top: 13px;
  padding-bottom: 13px;
`;
