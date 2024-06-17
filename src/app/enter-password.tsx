import { Redirect, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";
import { useStyledTheme } from "@/providers/StyledThemeProvider";
import { StatusBar } from "expo-status-bar";

function EnterPassowrd() {
  const theme = useTheme();
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
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors["bg-primary"] }}
      >
        <EnterPassCode
          header={t("pascode.header")}
          onPasswordFull={handlePasswordCheck}
        />
      </SafeAreaView>
      <StatusBar style={currentMode === "dark" ? "light" : "dark"} />
    </>
  );
}

export default EnterPassowrd;
