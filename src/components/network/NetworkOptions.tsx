import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import NetworkButton from "./NetworkButton";
import AlertWithImageUI from "../ui/AlertWithImageUi";

import { NetworkType } from "@/@types/network";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";

export type Ref = BottomSheetModal;

type Props = {
  networks: NetworkType[] | undefined;
  onSelect: (selected: Blockchain | null) => void;
  required?: boolean;
};

const NetworkOptions = forwardRef<Ref, Props>(
  ({ networks, onSelect = () => {}, required }, ref) => {
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const [selected, setSelected] = useState<string | null>(() => {
      if (networks && required) {
        const network = networks[0].label;
        return network;
      } else {
        return null;
      }
    });

    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = () => {
      bottomSheetRef.current?.present();
    };

    const filteredNetworks = useMemo(() => {
      if (!searchQuery) {
        return networks;
      }
      return networks?.filter((network) =>
        network.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [networks, searchQuery]);

    if (!networks || networks.length === 0) {
      return <AlertWithImageUI title="Can't find networks" />;
    }

    const selectHandler = (network: NetworkType) => {
      if (selected === network.label && !required) {
        setSelected(null);
        onSelect(null);
      } else {
        setSelected(network.label);
        onSelect(network.blockchain);
      }
      bottomSheetRef.current?.close();
    };

    return (
      <>
        <NetworkButton onPress={handlePresentModalPress}>
          {!selected && `${t("shared.all")} ${t("shared.network")}`}
          {selected && selected}
        </NetworkButton>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
        >
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
            {filteredNetworks?.map((network) => {
              return (
                <SpacerUi size="3xl" key={network.label}>
                  <TouchableOpacity onPress={() => selectHandler(network)}>
                    <ItemUi
                      title={network.label}
                      uri={network.icon}
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
      </>
    );
  }
);

export default NetworkOptions;
