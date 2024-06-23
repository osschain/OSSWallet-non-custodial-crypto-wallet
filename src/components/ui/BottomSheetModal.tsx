import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useMemo,
} from "react";
import { useTheme } from "styled-components/native";

import { useStyledTheme } from "@/providers/StyledThemeProvider";

export type Ref = BottomSheetModal;

type Props =
  | {
      children: ReactNode;
    }
  | ComponentPropsWithoutRef<typeof BottomSheetModal>;

const BottomSheetModalUi = forwardRef<Ref, Props>(
  ({ children, ...rest }, ref) => {
    const theme = useTheme();
    const { currentMode } = useStyledTheme();
    const snapPoints = useMemo(() => ["95%", "95%"], []);

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
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        {...rest}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

export default BottomSheetModalUi;
