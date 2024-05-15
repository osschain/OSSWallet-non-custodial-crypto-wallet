import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import NetworkButton from "@/components/network/NetworkButton";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import ItemUi from "@/components/ui/ItemUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { assets, networks } from "@/util/mock";

export default function Send() {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = useMemo(() => {
    if (!searchQuery) {
      return assets;
    }
    return assets.filter((asset) =>
      asset.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!assets) {
    return <AlertWithImageUI title="No Chains To Display" />;
  }

  return (
    <ContainerUi>
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
      <NetworkOptions
        ref={bottomSheetRef}
        networks={networks}
        onSelect={() => {}}
      />

      <SpacerUi size="xl">
        <NetworkButton onPress={handlePresentModalPress}>
          {t("shared.all")} {t("shared.network")}
        </NetworkButton>
      </SpacerUi>
      <ChainList>
        {filteredAssets.map((chain) => (
          <SpacerUi size="3xl" key={chain.id}>
            <Link href={`(wallet)/home/send/${chain.id}`} asChild>
              <TouchableOpacity>
                <ItemUi
                  title={chain.title}
                  uri={chain.image}
                  description={chain.description}
                  right={<BodyTextUi weight="bold">15</BodyTextUi>}
                />
              </TouchableOpacity>
            </Link>
          </SpacerUi>
        ))}
      </ChainList>
    </ContainerUi>
  );
}

const ChainList = styled.View``;
