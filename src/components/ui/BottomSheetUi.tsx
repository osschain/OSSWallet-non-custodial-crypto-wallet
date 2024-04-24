import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
export type Ref = BottomSheet;

interface Props {
  title: string;
}

const CloseBtn = () => {
  const { close } = useBottomSheet();

  return <Button title="Close" onPress={() => close()} />;
};

const BottomSheetUi = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      enablePanDownToClose
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      backgroundStyle={{ backgroundColor: "#1d0f4e" }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>{props.title}</Text>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",

    color: "#fff",
  },
});

export default BottomSheetUi;
