import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ItemUi from "@/components/ui/ItemUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { chains, networks } from "@/util/mock";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";

export default function Send() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredChains = useMemo(() => {
    if (!searchQuery) {
      return chains; // No search term, show all
    }
    return chains.filter((chain) =>
      chain.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!chains) {
    return <AlertWithImageUI title="No Chains To Display" />;
  }

  return (
    <Container>
      <TextInputUi
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search "
        left={<AntDesign name="search1" size={24} color="black" />}
      />
      <NetworkOptions
        ref={bottomSheetRef}
        networks={networks}
        onSelect={() => {}}
      />

      <SpacerUi size="xl">
        <NetworkButton onPress={handlePresentModalPress}>
          All Network
        </NetworkButton>
      </SpacerUi>
      <ChainList>
        {filteredChains.map((chain) => (
          <SpacerUi size="3xl" key={chain.id}>
            <Link href={`/(wallet)/home/send/${chain.id}`} asChild>
              <TouchableOpacity>
                <ItemUi
                  title={chain.title}
                  uri={chain.image}
                  description={chain.decription}
                  right={<BodyTextUi weight="bold">15</BodyTextUi>}
                />
              </TouchableOpacity>
            </Link>
          </SpacerUi>
        ))}
      </ChainList>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const ChainList = styled.View``;
