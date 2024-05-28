import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { AssetType } from "@/providers/AssetProvider";

export type Ref = BottomSheetModal;

type Props = {
  defSelected?: string;
  assets: AssetType[];
  onSelect: (asset: AssetType) => void;
};

const AssetOptions = forwardRef<Ref, Props>(
  ({ assets, defSelected, onSelect = () => {} }, ref) => {
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const [selected, setSelected] = useState(defSelected || null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering Logic
    const filteredAssets = useMemo(() => {
      if (!searchQuery) {
        return assets; // No search term, show all
      }
      return assets.filter((asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [assets, searchQuery]);

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
          {filteredAssets.map((asset) => {
            return (
              <SpacerUi size="3xl" key={asset.name}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(asset.name);

                    onSelect(asset);
                  }}
                >
                  <ItemUi
                    title={asset.name}
                    uri={asset.icon}
                    right={
                      selected === asset.name && (
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

export default AssetOptions;
