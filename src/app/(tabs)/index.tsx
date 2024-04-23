import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import { useStyledTheme } from "@/providers/StyledThemeProvider";

const Title = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors["yellow-500"]};
`;

export default function TabOneScreen() {
  const { toggleTheme } = useStyledTheme();

  return (
    <View>
      <Title onPress={toggleTheme}>HI Felas</Title>
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
