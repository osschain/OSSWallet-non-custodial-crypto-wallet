import { Stack, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";

export default function App() {
  const { link, label } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: label as string }} />
      <WebViewComponent source={{ uri: link as string }} />
    </>
  );
}

const WebViewComponent = styled(WebView)`
  flex: 1;
`;
