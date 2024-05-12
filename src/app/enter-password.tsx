import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

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
  const { t } = useTranslation();

  const { checkPassword, decryptAndSaveSeed, seed, encryptedSeed } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const continueHandler = async ({ password }: FormValues) => {
    const passwordMatch = await checkPassword(password);

    if (passwordMatch) {
      await decryptAndSaveSeed(password);
      router.push("(wallet)/");
    } else {
      Alert.alert(t("shared.error-label"), "password is not correct");
    }
  };

  if (seed) {
    return <Redirect href="/(wallet)/home" />;
  }

  if (!encryptedSeed) {
    return <Redirect href="/auth/" />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors["bg-primary"] }}
    >
      <Container>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Body>
            <SpacerUi size="4xl">
              <Logo
                resizeMode="contain"
                source={require("@/assets/images/unlock.png")}
              />
              <SpacerUi size="3.5xl">
                <HeaderText size="2xl" weight="extra">
                  {t("enter-password.password-incorrect")}
                </HeaderText>
              </SpacerUi>
            </SpacerUi>
            <SpacerUi size="4xl">
              <ControllTextInputUi
                secureTextEntry={!isPasswordShown}
                name="password"
                control={control}
                errors={errors}
                placeholder={t("shared.password")}
                right={
                  <Feather
                    onPress={() => setIsPasswordShown((prev) => !prev)}
                    name={!isPasswordShown ? "eye-off" : "eye"}
                    size={24}
                    color={theme.colors["text-primary"]}
                  />
                }
              />
            </SpacerUi>
          </Body>

          <Footer>
            <SpacerUi size="2xl">
              <Continue onPress={handleSubmit(continueHandler)}>
                {t("shared.continue")}
              </Continue>
            </SpacerUi>
            <SpacerUi size="2xl">
              <Continue onPress={() => SecureStore.deleteItemAsync("seed")}>
                {t("enter-password.remove-session")}
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
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
  text-align: center;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
`;

const Continue = styled(ButtonUi)`
  /* margin-top: 100px; */
`;

export default EnterPassowrd;
