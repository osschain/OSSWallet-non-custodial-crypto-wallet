import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";

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
        <ContainerUi>
          <SpacerUi size="3xl">
            <TextInputUi
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search "
              left={
                <IconUi
                  library="AntDesign"
                  name="search1"
                  size="xl"
                  color="icon-second"
                />
              }
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
                  <ItemUi
                    title={network.label}
                    uri={network.image}
                    right={
                      selected === network.label && (
                        <IconUi
                          library="AntDesign"
                          name="check"
                          size="xl"
                          color="icon-second"
                        />
                      )
                    }
                  />
                </TouchableOpacity>
              </SpacerUi>
            );
          })}
        </ContainerUi>
      </BottomSheetModal>
    );
  }
);

export default NetworkOptions;
