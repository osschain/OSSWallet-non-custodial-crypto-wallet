import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function PasswordSetup() {
  const { encryptAndSaveMnemonic } = useAuth();
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
    encryptAndSaveMnemonic(password);
    router.push("/auth/wallet-creating");
  };

  return (
    <>
      {!password ? (
        <EnterPassCode
          header={t("auth.password-setup.enter-passcode")}
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

export default PasswordSetup;
