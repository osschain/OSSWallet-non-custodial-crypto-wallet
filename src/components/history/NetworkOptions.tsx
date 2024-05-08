import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import HeaderTextUi from "../ui/HeaderTextUi";
import SpacerUi from "../ui/SpacerUi";
import { TextInputUi } from "../ui/TextInputUi";

export type Ref = BottomSheetModal;

type Props = {
  networks: any[];
  onSelect: (selected: string) => void;
};

const NetworkOptions = forwardRef<Ref, Props>(
  ({ networks, onSelect = () => {} }, ref) => {
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const [selected, setSelected] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering Logic
    const filteredNetworks = useMemo(() => {
      if (!searchQuery) {
        return networks; // No search term, show all
      }
      return networks.filter((network) =>
        network.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [networks, searchQuery]);

    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
        <Container>
          <SpacerUi size="3xl">
            <TextInputUi
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search "
              left={<AntDesign name="search1" size={24} color="black" />}
            />
          </SpacerUi>
          {filteredNetworks.map((network) => {
            return (
              <SpacerUi size="3xl" key={network.id}>
                <TouchableOpacity
                  onPress={() => {
                    if (selected === network.label) {
                      setSelected(null);
                    } else {
                      setSelected(network.label);
                    }
                    onSelect(network.label);
                  }}
                >
                  <Network>
                    <Details>
                      <Image source={{ uri: network.image }} />
                      <Label>{network.label}</Label>
                    </Details>
                    {selected === network.label && (
                      <Selected>
                        <AntDesign name="check" size={24} color="black" />
                      </Selected>
                    )}
                  </Network>
                </TouchableOpacity>
              </SpacerUi>
            );
          })}
        </Container>
      </BottomSheetModal>
    );
  }
);

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Selected = styled.View``;

const Network = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Details = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;
const Image = styled.Image`
  width: 48px;
  height: 48px;
`;

const Label = styled(HeaderTextUi)``;

export default NetworkOptions;
