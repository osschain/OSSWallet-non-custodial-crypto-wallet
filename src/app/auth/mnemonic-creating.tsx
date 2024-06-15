import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import {
  AnimatedContainerUi,
  BodyUi,
  FooterUi,
} from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";

const bip39 = require("bip39");

export default function MnemonicCreating() {
  const { addMnemonic, addIsImporting } = useAuth();
  const { t } = useTranslation();
  const [isError, setIserror] = useState(false);

  const animation = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${animation.value}deg` }, // Rotation
      ],
    };
  });

  useEffect(() => {
    addIsImporting(false);
  }, []);

  useEffect(() => {
    const bootstrap = () => {
      const mnemonic = bip39.generateMnemonic();
      if (!mnemonic) {
        setIserror(true);
        return;
      }
      addMnemonic(mnemonic as string);
    };
    bootstrap();
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      animation.value = withRepeat(
        withSequence(
          withTiming(-16, { duration: 500, easing: Easing.linear }), // Move right
          withTiming(0, { duration: 500, easing: Easing.linear }) // Move left
        ),
        -1
      );
    };
    startAnimation();
    return () => {
      animation.value = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <SpacerUi size="4xl">
        <MessageUi>{t("auth.mnemonic-creating.no-mnemonic-error")}</MessageUi>
      </SpacerUi>
    );
  }

  return (
    <AnimatedContainerUi entering={FadeInRight.duration(300)}>
      <Body>
        <PenImage
          style={[animationStyle]}
          resizeMode="contain"
          source={require("@/assets/images/pen.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderTextUi size="2xl" weight="bold">
            {t("auth.mnemonic-creating.header")}
          </HeaderTextUi>
        </SpacerUi>
        <SpacerUi size="4xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {t("auth.mnemonic-creating.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi>
        <ButtonUi onPress={() => router.push("/auth/mnemonic-back-uping")}>
          {" "}
          {t("shared.continue")}
        </ButtonUi>
      </FooterUi>
    </AnimatedContainerUi>
  );
}

const Body = styled(BodyUi)`
  align-items: center;
  justify-content: center;
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const PenImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
`;
