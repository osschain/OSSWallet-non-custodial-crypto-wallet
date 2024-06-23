import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { ActivityIndicator } from "react-native";

import BottomSheetModalUi from "./BottomSheetModal";

import CameraUi from "@/components/ui/CameraUi";

export type Ref = BottomSheetModal;

type Props = {
  onBarcodeScanner: (data: string) => void;
};

const ScannerModalUi = forwardRef<Ref, Props>(({ onBarcodeScanner }, ref) => {
  const [isScanned, setIsScanned] = useState(false);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  return (
    <BottomSheetModalUi
      onChange={(isOpen) => {
        if (isOpen === 1) {
          setIsScanned(false);
        }
        setIsCameraLoaded((prev) => !prev);
      }}
      ref={ref}
    >
      {!isCameraLoaded && <ActivityIndicator style={{ marginTop: 64 }} />}
      {isCameraLoaded && (
        <CameraUi
          onBarcodeScanned={(state) => {
            const { data } = state;
            if (isScanned) return;
            onBarcodeScanner(data);
            setIsScanned(true);
          }}
        />
      )}
    </BottomSheetModalUi>
  );
});

export default ScannerModalUi;
