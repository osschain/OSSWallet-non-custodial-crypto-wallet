import DefaultHeader from "@/components/layout/DefaultHeader";
import SecondHeader from "@/components/layout/SecondHeader";
import { SegmentedControl } from "@/components/segment";
import ButtonUi from "@/components/ui/ButtonUi";
import CheckBoxUi from "@/components/ui/CheckBoxUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchContainerUi, SwitchUi } from "@/components/ui/SwitchUi";
import WalletCard from "@/components/wallet/wallet-card";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const options = ["Assets", "NFT", "History"];

export default function TabOneScreen() {
  const [selectedOption, setSelectedOption] = useState("Assets");

  return (
    <View>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <SpacerUi size="xl">
        <WalletCard />
      </SpacerUi>
      <SpacerUi>
        <CheckBoxUi />
      </SpacerUi>
      <SpacerUi>
        <SwitchContainerUi>
          <SwitchUi />
        </SwitchContainerUi>
      </SpacerUi>
      <SpacerUi>
        <ButtonUi>Button</ButtonUi>
      </SpacerUi>
      <SpacerUi>
        <DefaultHeader />
      </SpacerUi>
      <SpacerUi>
        <SecondHeader />
      </SpacerUi>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
