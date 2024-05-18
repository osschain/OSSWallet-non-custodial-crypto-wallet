import { router } from "expo-router";
import { useEffect, useState } from "react";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function PasswordSetup() {
  const { encryptAndSaveSeed } = useAuth();
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  useEffect(() => {
    if (password && password === confirmPassword) {
      continueHandler(password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword, password]);

  const continueHandler = (password: string) => {
    encryptAndSaveSeed(password);
    router.push("/auth/wallet-creating");
  };

  return (
    <>
      {!password ? (
        <EnterPassCode
          header="Enter Passcode"
          onPasswordFull={(password) => setPassword(password)}
        />
      ) : (
        <EnterPassCode
          header="Confirm Passcode"
          onPasswordFull={(password) => setConfirmPassword(password)}
        />
      )}
    </>
  );
}

export default PasswordSetup;
