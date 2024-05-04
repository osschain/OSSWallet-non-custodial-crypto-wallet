import { View, Text } from "react-native";

import { useAuth } from "@/providers/AuthProvider";

export default function Swap() {
  const { seed } = useAuth();

  return (
    <View>
      <Text>Wallet Page</Text>
    </View>
  );
}
