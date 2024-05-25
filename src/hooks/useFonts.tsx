import { useFonts } from "expo-font";

export default function useFont() {
  const [fontsLoaded, fontError] = useFonts({
    "OpenSans-300": require("@/assets/fonts/open-sans/OpenSans-Light.ttf"),
    "OpenSans-400": require("@/assets/fonts/open-sans/OpenSans-Regular.ttf"),
    "OpenSans-500": require("@/assets/fonts/open-sans/OpenSans-Medium.ttf"),
    "OpenSans-600": require("@/assets/fonts/open-sans/OpenSans-Semi.ttf"),
    "OpenSans-700": require("@/assets/fonts/open-sans/OpenSans-Bold.ttf"),

    "Poppins-300": require("@/assets/fonts/popins/Poppins-Light.ttf"),
    "Poppins-400": require("@/assets/fonts/popins/Poppins-Regular.ttf"),
    "Poppins-500": require("@/assets/fonts/popins/Poppins-Medium.ttf"),
    "Poppins-600": require("@/assets/fonts/popins/Poppins-Semi.ttf"),
    "Poppins-700": require("@/assets/fonts/popins/Poppins-Bold.ttf"),
  });

  return { fontsLoaded, fontError };
}
