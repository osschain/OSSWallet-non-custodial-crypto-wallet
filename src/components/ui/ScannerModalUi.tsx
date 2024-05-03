import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

import CameraUi from "@/components/ui/CameraUi";

export type Ref = BottomSheetModal;

type Props = {
  onBarcodeScanner: (data: string) => void;
};

const ScannerModalUi = forwardRef<Ref, Props>(({ onBarcodeScanner }, ref) => {
  const snapPoints = useMemo(() => ["95%", "95%"], []);
  const [isScanned, setIsScanned] = useState(false);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  return (
    <BottomSheetModal
      onChange={(isOpen) => {
        if (isOpen === 1) {
          setIsScanned(false);
        }
        setIsCameraLoaded((prev) => !prev);
      }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
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
    </BottomSheetModal>
  );
});

export default ScannerModalUi;
