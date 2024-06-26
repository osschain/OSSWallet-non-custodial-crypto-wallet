import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

import { AssetType } from "@/@types/assets";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

export type Ref = BottomSheetModal;

type Props = {
  defSelected?: string;
  assets: AssetType[];
  onSelect: (asset: AssetType) => void;
};

const AssetOptions = forwardRef<Ref, Props>(
  ({ assets, defSelected, onSelect = () => {} }, ref) => {
    const theme = useTheme();
    const { currentMode } = useStyledTheme();
    const { t } = useTranslation();
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const [selected, setSelected] = useState(defSelected || null);
    const [searchQuery, setSearchQuery] = useState("");

    // Filtering Logic
    const filteredAssets = useMemo(() => {
      if (!searchQuery) {
        return assets; // No search term, show all
      }
      return assets.filter((asset) =>
        asset.blockchain.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [assets, searchQuery]);

    return (
      <BottomSheetModal
        handleStyle={{
          backgroundColor: theme.colors["bg-primary"],
        }}
        backgroundStyle={{ backgroundColor: theme.colors["bg-primary"] }}
        handleIndicatorStyle={{
          backgroundColor:
            currentMode === "dark" ? theme.colors["pure-white"] : "black",
          borderWidth: 0,
        }}
        ref={ref}
        index={0}
        snapPoints={snapPoints}
      >
        <ContainerUi>
          <SpacerUi size="3xl">
            <TextInputUi
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t("shared.search")}
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
              <SpacerUi size="3xl" key={asset.id}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(asset.blockchain);

                    onSelect(asset);
                  }}
                >
                  <ItemUi
                    title={asset.blockchain}
                    uri={asset.icon}
                    right={
                      selected === asset.blockchain && (
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
