import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import ControllTextInputUi from "@/components/ui/ControllTexInputUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";

type FormValues = {
  password: string;
};

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

function EnterPassowrd() {
  const theme = useTheme();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { addPassword, checkPassword } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const continueHandler = async ({ password }: FormValues) => {
    const passwordMatch = await checkPassword(password);
    console.log(password);
    console.log(passwordMatch);
    if (passwordMatch) {
      addPassword(password);
      router.push("/(wallet)/");
    } else {
      Alert.alert("...ops", "password is not correct");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScrollView
          contentContainerStyle={{
            minHeight: "100%",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <SpacerUi size="4xl" />
            <Header>
              <Logo
                resizeMode="contain"
                source={require("@/assets/images/unlock.png")}
              />
              <SpacerUi size="3.5xl">
                <HeaderText size="2xl" weight="extra">
                  Enter Your Password
                </HeaderText>
              </SpacerUi>
            </Header>
            <SpacerUi size="4xl" />
            <Body>
              <ControllTextInputUi
                secureTextEntry={!isPasswordShown}
                name="password"
                control={control}
                errors={errors}
                placeholder="Password"
                right={
                  <Feather
                    onPress={() => setIsPasswordShown((prev) => !prev)}
                    name={!isPasswordShown ? "eye-off" : "eye"}
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

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
`;

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

export default EnterPassowrd;
