import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const { link, label } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: label as string }} />
      <WebView style={styles.container} source={{ uri: link as string }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
