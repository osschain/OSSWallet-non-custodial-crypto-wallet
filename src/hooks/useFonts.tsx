import { useFonts } from "expo-font";

export default function useFont() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-thin": require("@/assets/fonts/Inter-Thin.ttf"),
    "Inter-400": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-500": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-700": require("@/assets/fonts/Inter-Bold.ttf"),
  });

  return { fontsLoaded, fontError };
}
