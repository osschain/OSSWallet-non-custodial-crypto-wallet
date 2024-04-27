import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SeedBackUpPreparing from "@/components/create-wallet/SeedBackUpPreparing";
import SeedBackUping from "@/components/create-wallet/SeedBackUping";
import SeedChecking from "@/components/create-wallet/SeedChecking";
import SeedLoading from "@/components/create-wallet/SeedLoading";
import { getRandomInt } from "@/util/getRandomInt";
import { mockedSeed } from "@/util/mock";

type States = "loading" | "preparing" | "backUping" | "checking";

export default function CreateWallet() {
  const [state, setState] = useState<States>("loading");
  const [seed, setSeed] = useState<string[]>([]);
  const [words, setWords] = useState<{ word: string; order: number }[]>([]);

  useEffect(() => {
    const generateSeed = async () => {
      const seedArray = mockedSeed.trim().split(/\s+/);

      setTimeout(() => {
        setSeed(seedArray);
        const words = getWords(seedArray);
        setWords(words);
        setState("preparing");
      }, 1000);
    };

    generateSeed();
  }, []);

  const getWords = (seed: string[]) => {
    const count = 3;
    const seedLength = seed.length;
    const randomSeedWords: { word: string; order: number }[] = [];

    for (let i = 1; i <= count; i++) {
      const index = getRandomInt(seedLength);
      randomSeedWords.push({
        word: seed[index],
        order: index,
      });
    }

    return randomSeedWords;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {state === "loading" && <SeedLoading />}
      {state === "preparing" && (
        <SeedBackUpPreparing
          onContinue={() => {
            setState("backUping");
          }}
        />
      )}
      {state === "backUping" && (
        <SeedBackUping seed={seed} onContinue={() => setState("checking")} />
      )}
      {state === "checking" && (
        <SeedChecking
          words={words}
          onContinue={() => {
            console.log("go To the pin");
          }}
        />
      )}
    </SafeAreaView>
  );
}
