import { useEffect } from "react";
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

import { AnimatedContainerUi, BodyUi, FooterUi } from "../ui/LayoutsUi";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useLanguage } from "@/providers/LanguageProvider";

const Continue = styled(ButtonUi)``;
type Props = {
  onContinue: () => void;
};
const SeedBackUpPreparing = ({ onContinue = () => {} }: Props) => {
  const { i18n } = useLanguage();
  const animation = useSharedValue(0);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${animation.value}deg` }, // Rotation
      ],
    };
  });

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

  return (
    <AnimatedContainerUi entering={FadeInRight.duration(300)}>
      <Body>
        <PenImage
          style={[animationStyle]}
          resizeMode="contain"
          source={require("@/assets/images/pen.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderText size="2xl" weight="extra">
            {i18n.t("auth.seed-creating.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="4xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {i18n.t("auth.seed-creating.description")}
          </DescriptionText>
        </SpacerUi>
      </Body>
      <FooterUi>
        <Continue onPress={onContinue}> {i18n.t("shared.continue")}</Continue>
      </FooterUi>
    </AnimatedContainerUi>
  );
};

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

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

export default SeedBackUpPreparing;
