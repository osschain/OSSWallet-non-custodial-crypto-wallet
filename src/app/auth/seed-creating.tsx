import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SeedBackUpPreparing from "@/components/create-wallet/SeedBackUpPreparing";
import SeedLoading from "@/components/create-wallet/SeedLoading";
import { useAuth } from "@/providers/AuthProvider";
import { mockedSeed } from "@/util/mock";

type States = "loading" | "preparing";

function SeedCreating() {
  const [state, setState] = useState<States>("loading");
  const { addSeed } = useAuth();

  useEffect(() => {
    const generateSeed = async () => {
      setTimeout(() => {
        setState("preparing");
        addSeed(mockedSeed);
      }, 1000);
    };

    generateSeed();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {state === "loading" && <SeedLoading />}
      {state === "preparing" && (
        <SeedBackUpPreparing
          onContinue={() => {
            router.push("/auth/seed-back-uping");
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default SeedCreating;
