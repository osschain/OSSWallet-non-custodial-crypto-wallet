import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function ChangePassCode() {
  const { encryptAndSaveSeed, checkPassword } = useAuth();
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (password && password === confirmPassword) {
      continueHandler(password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword, password]);

  const continueHandler = (password: string) => {
    encryptAndSaveSeed(password);
    router.push("auth/congretulation");
  };

  const handleOldPasswordSet = async (password: string) => {
    const isMatched = await checkPassword(password);

    if (isMatched) {
      setIsMatched(true);
    } else {
      Alert.alert(t("shared.error-label"), t("pascode.password-incorrect"));
    }
  };

  if (!isMatched) {
    return (
      <EnterPassCode
        header={t("pascode.current-passcode")}
        onPasswordFull={(password) => handleOldPasswordSet(password)}
      />
    );
  }

  return (
    <>
      {!password ? (
        <EnterPassCode
          header={t("pascode.header")}
          onPasswordFull={(password) => setPassword(password)}
        />
      ) : (
        <EnterPassCode
          header={t("pascode.confirm-header")}
          onPasswordFull={(password) => setConfirmPassword(password)}
        />
      )}
    </>
  );
}

export default ChangePassCode;
