import { Feather } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { Container } from "@/components/ui/Container";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import TextInputUi from "@/components/ui/TextInputUi";

function SeedChecking() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            justifyContent: "space-between",
          }}
        >
          <SpacerUi size="4xl">
            <Header>
              <Logo
                resizeMode="contain"
                source={require("@/assets/images/unlock.png")}
              />
              <SpacerUi size="3.5xl">
                <HeaderText size="3xl" weight="extra">
                  Create Password
                </HeaderText>
              </SpacerUi>
              <SpacerUi size="xl">
                <DescriptionText size="lg" color="text-second" weight="regular">
                  We Will use your Password for secure your Seed Phrase, so
                  create Strong Password
                </DescriptionText>
              </SpacerUi>

              <SpacerUi size="4xl" />
            </Header>
            <Body>
              <TextInput
                secureTextEntry
                placeholder="Password"
                right={
                  <Feather
                    name="eye"
                    size={24}
                    color={theme.colors["text-primary"]}
                  />
                }
              />
              <SpacerUi size="2xl" />
              <TextInput
                secureTextEntry
                placeholder="Confirm Password"
                right={
                  <Feather
                    name="eye"
                    size={24}
                    color={theme.colors["text-primary"]}
                  />
                }
              />
            </Body>
          </SpacerUi>

          <Footer>
            <Continue>Continue</Continue>
          </Footer>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const Body = styled(View)`
  /* font-size: 40px; */
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin-bottom: ${({ theme }) => theme.spaces["4xl"]};
`;

const Continue = styled(ButtonUi)`
  margin-top: 100px;
`;

const TextInput = styled(TextInputUi)``;

export default SeedChecking;
