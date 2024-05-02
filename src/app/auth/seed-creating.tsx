import { router } from "expo-router";
import { useEffect, useState } from "react";

import SeedBackUpPreparing from "@/components/auth/SeedBackUpPreparing";
import SeedLoading from "@/components/auth/SeedLoading";
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
    <>
      {state === "loading" && <SeedLoading />}
      {state === "preparing" && (
        <SeedBackUpPreparing
          onContinue={() => {
            router.push("/auth/seed-back-uping");
          }}
        />
      )}
    </>
  );
}

export default SeedCreating;
