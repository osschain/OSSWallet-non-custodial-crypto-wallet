import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function EnterPassowrd() {
  const theme = useTheme();
  const { t } = useTranslation();

  const { checkPassword, decryptAndSaveSeed, seed, encryptedSeed } = useAuth();

  const handlePasswordCheck = async (password: string) => {
    try {
      const passwordMatch = await checkPassword(password);
      if (passwordMatch) {
        await decryptAndSaveSeed(password);
        router.push("(wallet)/");
      } else {
        showAlert();
      }
    } catch {
      showAlert();
    }
  };

  const showAlert = () => {
    Alert.alert(
      t("shared.error-label"),
      t("enter-password.password-incorrect")
    );
  };

  if (seed) {
    return <Redirect href="/(wallet)/home" />;
  }

  if (!encryptedSeed) {
    return <Redirect href="/auth/" />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors["bg-primary"] }}
    >
      <EnterPassCode
        header={t("enter-password.header")}
        onPasswordFull={handlePasswordCheck}
      />
      <Button
        title="Remove session"
        onPress={() => {
          SecureStore.deleteItemAsync("seed");
          router.push("/auth/");
        }}
      />
    </SafeAreaView>
  );
}

export default EnterPassowrd;
