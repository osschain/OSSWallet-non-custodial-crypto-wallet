import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function ChangePassCode() {
  const { encryptAndSaveMnemonic, checkPassword } = useAuth();
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const { t } = useTranslation();

  // This function is responsible for handling the password match logic and navigation.
  const handlePasswordMatch = (confirmPassword: string) => {
    if (password && password === confirmPassword) {
      encryptAndSaveMnemonic(password);
      router.push("/(wallet)/home");
    } else if (confirmPassword !== null) {
      Alert.alert(t("shared.error-label"), t("pascode.password-incorrect"));
    }
  };

  // This function handles the scenario where the user enters their old password.
  const handleOldPasswordSet = async (password: string) => {
    const isMatched = await checkPassword(password);

    if (isMatched) {
      setIsMatched(true);
    } else {
      Alert.alert(t("shared.error-label"), t("pascode.password-incorrect"));
    }
  };

  // Conditionally render the correct component based on the current state.
  if (!isMatched) {
    return (
      <EnterPassCode
        header={t("pascode.current-passcode")}
        onPasswordFull={handleOldPasswordSet}
      />
    );
  }

  // If the password has not been set, prompt the user to set it.
  if (!password) {
    return (
      <EnterPassCode
        header={t("pascode.header")}
        onPasswordFull={(password) => setPassword(password)}
      />
    );
  }

  // Prompt the user to confirm the password and immediately check for a match.
  return (
    <EnterPassCode
      header={t("pascode.confirm-header")}
      onPasswordFull={(password) => {
        handlePasswordMatch(password);
      }}
    />
  );
}

export default ChangePassCode;
