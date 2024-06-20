import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { forwardRef, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

export type Ref = BottomSheetModal;

type Props = {
  defSelected?: string;
  locales: { name: string; locale: string; flag: string }[];
  onSelect: (locale: string) => void;
};

const LocaleOptions = forwardRef<Ref, Props>(
  ({ locales, defSelected, onSelect = () => {} }, ref) => {
    const snapPoints = useMemo(() => ["45%", "45%"], []);
    const [selected, setSelected] = useState(defSelected || null);
    const theme = useTheme();
    const { currentMode } = useStyledTheme();
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
          backgroundColor: theme.colors["bg-primary"],
        }}
        backgroundStyle={{ backgroundColor: theme.colors["bg-primary"] }}
        handleIndicatorStyle={{
          backgroundColor:
            currentMode === "dark" ? theme.colors["pure-white"] : "black",
          borderWidth: 0,
        }}
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
          {locales?.map((language, index) => {
            return (
              <SpacerUi size="3xl" key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setSelected(language.locale);
                    onSelect(language.locale);
                  }}
                >
                  <ItemUi
                    uri={language.flag}
                    title={language.name}
                    right={
                      selected === language.locale && (
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

export default LocaleOptions;
