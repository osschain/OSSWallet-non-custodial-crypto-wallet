import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

import BottomSheetModalUi from "../ui/BottomSheetModal";

import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

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

    useEffect(() => {
      const bootstrapAsync = async () => {
        const lang = await AsyncStorage.getItem("lang");
        if (lang) {
          setSelected(lang);
        } else {
          setSelected("en");
        }
      };
      bootstrapAsync();
    }, []);

    return (
      <BottomSheetModalUi ref={ref} snapPoints={snapPoints}>
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
      </BottomSheetModalUi>
    );
  }
);

export default LocaleOptions;
