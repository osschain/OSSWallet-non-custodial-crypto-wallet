import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

import CameraUi from "@/components/ui/CameraUi";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

export type Ref = BottomSheetModal;

type Props = {
  onBarcodeScanner: (data: string) => void;
};

const ScannerModalUi = forwardRef<Ref, Props>(({ onBarcodeScanner }, ref) => {
  const theme = useTheme();
  const { currentMode } = useStyledTheme();
  const snapPoints = useMemo(() => ["95%", "95%"], []);
  const [isScanned, setIsScanned] = useState(false);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
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
