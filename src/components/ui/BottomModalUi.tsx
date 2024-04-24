import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
export type Ref = BottomSheetModal;

const BottomModalUi = forwardRef<Ref>((props, ref) => {
  return (
    <BottomSheetModal enableDynamicSizing ref={ref} index={0}>
      <View style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Bottom Modal 😎</Text>
      </View>
    </BottomSheetModal>
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
    padding: 20,
  },
});

export default BottomModalUi;
