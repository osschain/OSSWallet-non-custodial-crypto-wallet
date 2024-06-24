import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import { useAuth } from "@/providers/AuthProvider";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

function EnterPassowrd() {
  const { currentMode } = useStyledTheme();
  const { t } = useTranslation();

  const { checkPassword, decryptAndSaveMnemonic, mnemonic, encryptedMnemonic } =
    useAuth();

  const handlePasswordCheck = async (password: string) => {
    try {
      const passwordMatch = await checkPassword(password);
      if (passwordMatch) {
        await decryptAndSaveMnemonic(password);
        router.push("(wallet)/");
      } else {
        showAlert();
      }
    } catch {
      showAlert();
    }
  };

  const showAlert = () => {
    Alert.alert(t("shared.error-label"), t("pascode.password-incorrect"));
  };

  if (mnemonic) {
    return <Redirect href="/(wallet)/home" />;
  }

  if (!encryptedMnemonic) {
    return <Redirect href="/auth" />;
  }

  return (
    <>
      <ScrollContainerUi>
        <EnterPassCode
          header={t("pascode.header")}
          onPasswordFull={handlePasswordCheck}
        />
      </ScrollContainerUi>
      <StatusBar style={currentMode === "dark" ? "light" : "dark"} />
    </>
  );
}

export default EnterPassowrd;
