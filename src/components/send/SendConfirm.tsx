import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";

import ButtonUi from "../ui/ButtonUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "../ui/LayoutsUi";
import SpacerUi from "../ui/SpacerUi";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

type Props = {
  onConfirm: () => void;
  isLoading: boolean;
  children: ReactNode;
  isDetialsLoading: boolean;
};

const SendConfirm = forwardRef<BottomSheetModal, Props>(
  ({ onConfirm, isLoading, children, isDetialsLoading }, ref) => {
    const theme = useTheme();
    const { currentMode } = useStyledTheme();
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const { t } = useTranslation();
    return (
      <BottomSheetModal
        name="Transfer"
        index={0}
        snapPoints={snapPoints}
        ref={ref}
        handleStyle={{
          backgroundColor: theme.colors["bg-primary"],
        }}
        backgroundStyle={{ backgroundColor: theme.colors["bg-primary"] }}
        handleIndicatorStyle={{
          backgroundColor:
            currentMode === "dark" ? theme.colors["pure-white"] : "black",
          borderWidth: 0,
        }}
      >
        <ScrollContainerUi>
          <BodyUi>{children}</BodyUi>
          <FooterUi>
            <ButtonUi
              onPress={onConfirm}
              disabled={isDetialsLoading || isLoading}
              isLoading={isLoading}
            >
              {t("shared.confirm")}
            </ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi
                variant="secondary"
                onPress={() => ref?.current.close()}
              >
                {t("shared.cancel")}
              </ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ScrollContainerUi>
      </BottomSheetModal>
    );
  }
);

export default SendConfirm;
