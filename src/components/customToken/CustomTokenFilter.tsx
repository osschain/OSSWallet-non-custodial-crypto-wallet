import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { UseNetworks } from "@/app/api/network";
import NetworkOptions from "@/components/network/NetworkOptions";
import IconUi from "@/components/ui/IconUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";

const CustomTokenFilters = ({
  onFilter,
}: {
  onFilter: (address: string, network: Blockchain) => void;
}) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState<string>("");
  const [network, setNetwork] = useState<Blockchain>("eth");
  const { data: networks } = UseNetworks();

  const scannerHandler = async (data: string) => {
    ScannerModal.current?.close();
    onFilter(data, network);
    setAddress(data);
  };

  const ScannerModal = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    ScannerModal.current?.present();
  };

  return (
    <>
      <ScannerModalUi ref={ScannerModal} onBarcodeScanner={scannerHandler} />
      <NetworkOptions
        networks={networks}
        onSelect={(selected) => {
          if (!selected) return;
          onFilter(address, selected);
          setNetwork(selected);
        }}
        required
      />
      <SpacerUi size="2xl">
        <TextAreaInputUi
          placeholder={t(
            "wallet.home.custom-token.add-custom-token.address-input-placeholder"
          )}
          value={address}
          onChangeText={(text) => {
            onFilter(text, network);
            setAddress(text);
          }}
          multiline
          autoCapitalize="none"
          right={
            <IconUi
              library="Ionicons"
              name="scan"
              size="2xl"
              color="icon-second"
              onPress={handlePresentModalPress}
            />
          }
        />
      </SpacerUi>
    </>
  );
};

export default CustomTokenFilters;
