import { Wallet } from "ethers";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AuthLoading from "@/components/auth/AuthLoading";
import SeedBackUpPreparing from "@/components/auth/SeedBackUpPreparing";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";

type States = "loading" | "preparing";

function SeedCreating() {
  const [state, setState] = useState<States>("loading");
  const { addSeed } = useAuth();
  const { t } = useTranslation();
  const [isError, setIserror] = useState(false);
  useEffect(() => {
    const generateSeed = async () => {
      setTimeout(() => {
        const wallet = Wallet.createRandom();
        const seed = wallet.mnemonic?.phrase;

        if (!seed) {
          setIserror(true);
          return;
        }

        setState("preparing");
        addSeed(seed as string);
      }, 0);
    };
    generateSeed();
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
            router.push("auth/seed-back-uping");
          }}
        />
      )}
    </>
  );
}

export default SeedCreating;
