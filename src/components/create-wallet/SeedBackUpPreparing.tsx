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

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { AnimatedContainer } from "@/components/ui/Container";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
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

const Footer = styled.View`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spaces["4xl"]};
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const Continue = styled(ButtonUi)``;
type Props = {
  onContinue: () => void;
};
export default function SeedBackUpPreparing({ onContinue = () => {} }: Props) {
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
    <AnimatedContainer entering={FadeInRight.duration(300)}>
      <Header>
        <PenImage
          style={[animationStyle]}
          resizeMode="contain"
          source={require("@/assets/images/pen.png")}
        />

        <SpacerUi size="3.5xl">
          <HeaderText size="2xl" weight="extra">
            Take a pen and paper
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="4xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            Get ready to write down the secret key. This is the only way to
            regain access to the wallet. It is safest not to store the key on
            the devices.
          </DescriptionText>
        </SpacerUi>
      </Header>
      <Footer>
        <Continue onPress={onContinue}>Continue</Continue>
      </Footer>
    </AnimatedContainer>
  );
}
