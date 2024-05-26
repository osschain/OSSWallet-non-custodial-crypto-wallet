import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
const IosHeaderLeft = () => {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <MaterialIcons name="arrow-back-ios-new" size={24} color="#007AFF" />
    </TouchableOpacity>
  );
};

export default IosHeaderLeft;
