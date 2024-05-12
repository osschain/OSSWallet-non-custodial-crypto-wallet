import { AntDesign, Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import ButtonUi from "@/components/ui/ButtonUi";
import ItemUi from "@/components/ui/ItemUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { assets } from "@/util/mock";
import { Link } from "expo-router";

function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets; // No search term, show all
    }
    return assets.filter((network) =>
      network.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!assets) {
    return (
      <AlertWithImageUI
        title="Custom tokens haven’t been added.
    You can search for tokens
    or add them manually"
      />
    );
  }

  return (
    <Container>
      <Body>
        <SpacerUi size="lg">
          <TextInputUi
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name or paste address"
            left={<AntDesign name="search1" size={24} color="black" />}
          />
        </SpacerUi>

        <SpacerUi size="xl">
          <FlatList
            data={filteredAssets}
            renderItem={({ item }) => (
              <SpacerUi size="xl" position="bottom">
                <ItemUi
                  uri={item.image}
                  title={item.title}
                  description={item.description}
                  right={<SwitchUi onSwitch={() => {}} />}
                />
              </SpacerUi>
            )}
          />
        </SpacerUi>
      </Body>
      <Footer>
        <Link href="(wallet)/home/custom-token/add-custom-token" asChild>
          <ButtonUi icon={<Feather name="plus" size={20} color="white" />}>
            Add custom tokens
          </ButtonUi>
        </Link>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Body = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["2xl"]} 0;
`;

export default Index;
