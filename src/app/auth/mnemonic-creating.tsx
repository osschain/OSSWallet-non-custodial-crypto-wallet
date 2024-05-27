import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AuthLoading from "@/components/auth/AuthLoading";
import SeedBackUpPreparing from "@/components/auth/SeedBackUpPreparing";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";

const bip39 = require("bip39");

type States = "loading" | "preparing";

export default function MnemonicCreating() {
  const [state, setState] = useState<States>("loading");
  const { addSeed } = useAuth();
  const { t } = useTranslation();
  const [isError, setIserror] = useState(false);
  useEffect(() => {
    const bootstraptAsync = async () => {
      setTimeout(() => {
        const mnemonic = bip39.generateMnemonic();
        if (!mnemonic) {
          setIserror(true);
          return;
        }
        setState("preparing");
        addSeed(mnemonic as string);
      }, 0);
    };
    bootstraptAsync();
  }, []);

  if (isError) {
    return (
      <SpacerUi size="4xl">
        <MessageUi>{t("auth.seed-creating.no-seed-error")}</MessageUi>
      </SpacerUi>
    );
  }

  return (
    <>
      {state === "loading" && (
        <AuthLoading label={t("auth.seed-creating.making-wallet")} />
      )}
      {state === "preparing" && (
        <SeedBackUpPreparing
          onContinue={() => {
            router.push("/auth/mnemonic-back-uping");
          }}
        />
      )}
    </>
  );
}
