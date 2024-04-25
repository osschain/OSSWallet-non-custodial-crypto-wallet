import { View } from "react-native";

import CreatingLoader from "@/components/auth/CreatingLoader";
import { Container } from "@/components/ui/Container";

export default function CreateWallet() {
  return (
    <Container>
      <CreatingLoader />
    </Container>
  );
}
