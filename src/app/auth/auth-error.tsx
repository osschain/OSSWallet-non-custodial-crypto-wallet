import { Link } from "expo-router";
import { View } from "react-native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { ContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";

export default function AuthError() {
  return (
    <ContainerUi>
      <SpacerUi size="4xl" style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          <IconUi
            size="5xl"
            library="MaterialIcons"
            name="error-outline"
            color="red-100"
          />
        </View>
        <SpacerUi size="xl">
          <HeaderTextUi
            color="red-100"
            style={{ textAlign: "center" }}
            size="2xl"
          >
            There is error during wallet creation
          </HeaderTextUi>
        </SpacerUi>
        <SpacerUi size="xl">
          <Link href="/auth/" asChild>
            <ButtonUi>Start Again</ButtonUi>
          </Link>
        </SpacerUi>
      </SpacerUi>
    </ContainerUi>
  );
}
