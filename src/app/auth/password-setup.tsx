import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { Container } from "@/components/ui/Container";
import ControlLTextInputUi from "@/components/ui/ControllTexInputUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import TextInputUi from "@/components/ui/TextInputUi";

type FormValues = {
  password: string;
  confirmPassword: string;
};

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function SeedChecking() {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const continueHandler = ({ password }: FormValues) => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <SpacerUi size="4xl" />
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
            </Header>
            <SpacerUi size="4xl" />
            <Body>
              <ControlLTextInputUi
                secureTextEntry
                name="password"
                control={control}
                errors={errors}
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
              <ControlLTextInputUi
                secureTextEntry
                name="confirmPassword"
                control={control}
                errors={errors}
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
          </View>

          <Footer>
            <SpacerUi size="2xl">
              <Continue onPress={handleSubmit(continueHandler)}>
                Continue
              </Continue>
            </SpacerUi>
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
  /* margin-top: 100px; */
`;

const TextInput = styled(TextInputUi)``;

export default SeedChecking;
