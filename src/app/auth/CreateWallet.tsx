import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CreatingLoader from "@/components/auth/CreatingLoader";
import TakePen from "@/components/auth/TakePen";
import { Container } from "@/components/ui/Container";

export default function CreateWallet() {
  const [isTakPaper, setIsTakePaper] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTakePaper(true);
    }, 1500);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>{!isTakPaper ? <CreatingLoader /> : <TakePen />}</Container>
    </SafeAreaView>
  );
}
