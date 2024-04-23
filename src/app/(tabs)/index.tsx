import { StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";
import { useStyledTheme } from "@/providers/StyledThemeProvider";

const Title = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function TabOneScreen() {
  const { toggleTheme } = useStyledTheme();

  return (
    <View style={styles.container}>
      <Title onPress={toggleTheme}>HI Felas</Title>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
