import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components/native";
import * as yup from "yup";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import ControllTextInputUi from "@/components/ui/ControllTexInputUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";
import { useLanguage } from "@/providers/LanguageProvider";

type FormValues = {
  password: string;
  confirmPassword: string;
};

function PasswordSetup() {
  const theme = useTheme();
  const { i18n } = useLanguage();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmShown, setIsConfirmShown] = useState(false);

  const { encryptAndSaveSeed } = useAuth();

  const passwordSchema = useMemo(() => {
    return yup.object().shape({
      password: yup
        .string()
        .required(i18n.t("auth.password-setup.password-required"))
        .min(8, i18n.t("auth.password-setup.password-min-length")),
      confirmPassword: yup
        .string()
        .required(i18n.t("auth.password-setup.password-confirm-required"))
        .oneOf(
          [yup.ref("password")],
          i18n.t("auth.password-setup.password-match")
        ),
    });
  }, [i18n]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(passwordSchema),
  });

  const continueHandler = ({ password }: FormValues) => {
    encryptAndSaveSeed(password);
    router.push("auth/congretulation");
  };
  return (
    <ScrollContainerUi>
      <Body>
        <SpacerUi size="xl">
          <Logo
            resizeMode="contain"
            source={require("@/assets/images/unlock.png")}
          />
          <SpacerUi size="3.5xl">
            <HeaderText size="3xl" weight="extra">
              {i18n.t("auth.password-setup.header")}
            </HeaderText>
          </SpacerUi>
          <SpacerUi size="xl">
            <DescriptionText size="lg" color="text-second" weight="regular">
              {i18n.t("auth.password-setup.description")}
            </DescriptionText>
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="4xl">
          <ControllTextInputUi
            secureTextEntry={!isPasswordShown}
            name="password"
            control={control}
            errors={errors}
            placeholder={i18n.t("shared.password")}
            right={
              <Feather
                onPress={() => setIsPasswordShown((prev) => !prev)}
                name={!isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={theme.colors["text-primary"]}
              />
            }
          />
          <SpacerUi size="2xl" />
          <ControllTextInputUi
            secureTextEntry={!isConfirmShown}
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder={i18n.t("shared.confirm-password")}
            right={
              <Feather
                onPress={() => setIsConfirmShown((prev) => !prev)}
                name={!isConfirmShown ? "eye-off" : "eye"}
                size={24}
                color={theme.colors["text-primary"]}
              />
            }
          />
        </SpacerUi>
      </Body>

      <FooterUi>
        <SpacerUi size="2xl">
          <Continue onPress={handleSubmit(continueHandler)}>
            {i18n.t("shared.continue")}
          </Continue>
        </SpacerUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const Body = styled(BodyUi)`
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

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Continue = styled(ButtonUi)`
  /* margin-top: 100px; */
`;

export default PasswordSetup;
