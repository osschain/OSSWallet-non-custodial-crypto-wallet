import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Ref = BottomSheetModal;

type Props = {
  defSelected?: string;
  languages: { name: string; lng: string; flag: string }[];
  onSelect: (lng: string) => void;
};

const LanguageOptions = forwardRef<Ref, Props>(
  ({ languages, defSelected, onSelect = () => {} }, ref) => {
    const snapPoints = useMemo(() => ["45%", "45%"], []);
    const [selected, setSelected] = useState(defSelected || null);
    const theme = useTheme();

    const bootstrapAsync = async () => {
      const lang = await AsyncStorage.getItem("lang");
      if (lang) {
        setSelected(lang);
      } else {
        setSelected("en");
      }
    };
    bootstrapAsync();
    return (
      <BottomSheetModal
        handleStyle={{
          borderTopWidth: 1,
          borderColor: theme.colors["border-color"],
        }}
        ref={ref}
        index={0}
        snapPoints={snapPoints}
      >
        <ContainerUi
          style={{
            justifyContent: "flex-end",
            marginBottom: 50,
          }}
        >
          {languages?.map((language, index) => {
            return (
              <SpacerUi size="3xl" key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(language.lng);
                    onSelect(language.lng);
                  }}
                >
                  <ItemUi
                    uri={language.flag}
                    title={language.name}
                    right={
                      selected === language.lng && (
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

export default LanguageOptions;
