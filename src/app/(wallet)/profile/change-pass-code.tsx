import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import EnterPassCode from "@/components/auth/EnterPassCode";
import { useAuth } from "@/providers/AuthProvider";

function ChangePassCode() {
  const { encryptAndSaveSeed, checkPassword } = useAuth();
  const [isMatched, setIsMatched] = useState(false);
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
    router.push("auth/congretulation");
  };

  const handleOldPasswordSet = async (password: string) => {
    const isMatched = await checkPassword(password);

    if (isMatched) {
      setIsMatched(true);
    } else {
      Alert.alert("..ops", "Passcode is not correct");
    }
  };

  if (!isMatched) {
    return (
      <EnterPassCode
        header="Current Pass Code"
        onPasswordFull={(password) => handleOldPasswordSet(password)}
      />
    );
  }

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

export default ChangePassCode;
