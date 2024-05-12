import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { Asset } from "@/util/mock";

export type Ref = BottomSheetModal;

type Props = {
  defSelected?: string;
  assets: Asset[];
  onSelect: (asset: Asset) => void;
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
        asset.title.toLowerCase().includes(searchQuery.toLowerCase())
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
              left={<AntDesign name="search1" size={24} color="black" />}
            />
          </SpacerUi>
          {filteredAssets.map((asset) => {
            return (
              <SpacerUi size="3xl" key={asset.id}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(asset.title);

                    onSelect(asset);
                  }}
                >
                  <ItemUi
                    title={asset.title}
                    uri={asset.image}
                    right={
                      selected === asset.title && (
                        <AntDesign name="check" size={24} color="black" />
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
