import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import EnterPassCode from "@/components/auth/EnterPassCode";
import ButtonUi from "@/components/ui/ButtonUi";
import IconUi from "@/components/ui/IconUi";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import Animated, { FadeInRight } from "react-native-reanimated";

function CheckMnemonic() {
  const [isCopied, setIsCopied] = useState(false);

  const [isMatch, setIsMatch] = useState(false);
  const { t } = useTranslation();
  const { checkPassword, mnemonic } = useAuth();

  // This function is responsible for handling the password match logic and navigation.
  const handlePasswordMatch = async (password: string) => {
    const isMatch = await checkPassword(password);
    if (isMatch) {
      setIsMatch(isMatch);
    }
  };

  if (!isMatch) {
    return (
      <EnterPassCode
        header={t("pascode.header")}
        onPasswordFull={(password) => {
          handlePasswordMatch(password);
        }}
      />
    );
  }

  const copyHandler = async () => {
    await Clipboard.setStringAsync(mnemonic as string);
    setIsCopied(true);
  };

  // Prompt the user to confirm the password and immediately check for a match.
  return (
    <ScrollContainerUi>
      <Animated.View entering={FadeInRight.duration(300)}>
        <SpacerUi size="4xl">
          <TextAreaInputUi multiline value={mnemonic as string} />
        </SpacerUi>
        <SpacerUi size="4xl">
          <ButtonUi
            variant={isCopied ? "primary" : "secondary"}
            onPress={copyHandler}
            icon={
              <IconUi
                library="Feather"
                name={isCopied ? "check" : "copy"}
                size="xl"
                color="icon-second"
              />
            }
          >
            {t("wallet.home.recieve.recieve-details.Copy Address")}
          </ButtonUi>
        </SpacerUi>
      </Animated.View>
    </ScrollContainerUi>
  );
}

export default CheckMnemonic;
