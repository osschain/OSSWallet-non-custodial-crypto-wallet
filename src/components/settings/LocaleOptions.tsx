import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import BottomSheetModalUi from "../ui/BottomSheetModal";
import FlatListUi from "../ui/FlatListUi";

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
    const snapPoints = useMemo(() => ["50%", "50%"], []);
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
        <ContainerUi>
          <FlatListUi
            data={locales}
            renderItem={({ item }) => (
              <SpacerUi size="3xl">
                <TouchableOpacity
                  onPress={() => {
                    setSelected(item.locale);
                    onSelect(item.locale);
                  }}
                >
                  <ItemUi
                    uri={item.flag}
                    title={item.name}
                    right={
                      selected === item.locale && (
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
            )}
            keyExtractor={(item, index) => index.toString()} // Using index as key
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Optional separator
            contentContainerStyle={{ paddingBottom: 25 }} // Additional style if needed
          />
        </ContainerUi>
      </BottomSheetModalUi>
    );
  }
);

export default LocaleOptions;
