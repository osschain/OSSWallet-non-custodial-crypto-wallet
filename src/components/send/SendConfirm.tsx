import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

import ButtonUi from "../ui/ButtonUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "../ui/LayoutsUi";
import SpacerUi from "../ui/SpacerUi";

type Props = {
  onConfirm: () => void;
  children: ReactNode;
};

const SendConfirm = forwardRef<BottomSheetModal, Props>(
  ({ onConfirm, children }, ref) => {
    const snapPoints = useMemo(() => ["95%", "95%"], []);
    const { t } = useTranslation();
    return (
      <BottomSheetModal
        name="Transfer"
        index={0}
        snapPoints={snapPoints}
        ref={ref}
      >
        <ScrollContainerUi>
          <BodyUi>{children}</BodyUi>
          <FooterUi>
            <ButtonUi onPress={onConfirm}> {t("shared.confirm")}</ButtonUi>
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
