import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: ${($props) => $props.theme.spaces["3xl"]};
`;

const HeaderLeft = styled(View)``;
const HeaderMiddle = styled(View)``;

const HeaderRight = styled(View)`
  flex-direction: row;
  gap: ${($props) => $props.theme.spaces["3xl"]};
`;

const SecondHeader = () => {
  return (
    <SafeAreaView>
      <HeaderContainer>
        <HeaderLeft>
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons name="chevron-back" size={24} color="black" />
              )}
            </Pressable>
          </Link>
        </HeaderLeft>

        <HeaderMiddle>
          <HeaderTextUi size="xl">Tegro Wallet</HeaderTextUi>
        </HeaderMiddle>

        <HeaderRight>
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <AntDesign name="plus" size={24} color="black" />
              )}
            </Pressable>
          </Link>
        </HeaderRight>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default SecondHeader;
