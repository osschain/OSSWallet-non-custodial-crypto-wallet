import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef } from "react";
import { useTranslation } from "react-i18next";

import BottomSheetModalUi from "../ui/BottomSheetModal";
import ButtonUi from "../ui/ButtonUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "../ui/LayoutsUi";
import SpacerUi from "../ui/SpacerUi";

type Props = {
  onConfirm: () => void;
  isLoading: boolean;
  children: ReactNode;
  isDetialsLoading: boolean;
};

const SendConfirm = forwardRef<BottomSheetModal, Props>(
  ({ onConfirm, isLoading, children, isDetialsLoading }, ref) => {
    const { t } = useTranslation();
    return (
      <BottomSheetModalUi name="Transfer" ref={ref}>
        <ScrollContainerUi>
          <BodyUi>{children}</BodyUi>
          <FooterUi>
            <ButtonUi
              onPress={onConfirm}
              disabled={isDetialsLoading || isLoading}
              isLoading={isLoading}
              variant={isDetialsLoading || isLoading ? "secondary" : "primary"}
            >
              {t("shared.confirm")}
            </ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi
                variant="secondary"
                // @ts-ignore
                onPress={() => ref?.current.close()}
              >
                {t("shared.cancel")}
              </ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ScrollContainerUi>
      </BottomSheetModalUi>
    );
  }
);

export default SendConfirm;
