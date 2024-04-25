import { useCallback, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  Easing,
  Keyframe,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

const Header = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Logo = styled(Animated.Image)`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

export default function CreatingLoader() {
  const animation = useSharedValue(0);

  //   const rotation = useDerivedValue(() => {
  //     return interpolate(animation.value, [0, 360], [0, 360]);
  //   });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + "deg",
        },
      ],
    };
  });
  useEffect(() => {
    const startAnimation = () => {
      animation.value = withRepeat(
        withTiming(360, {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1
      );
    };
    startAnimation();
    return () => {
      animation.value = 0;
    };
  }, []);

  return (
    <Header>
      <Logo
        style={[animationStyle]}
        resizeMode="contain"
        source={require("@/assets/images/setting.png")}
      />

      <SpacerUi size="3.5xl">
        <HeaderText size="2xl" weight="extra">
          Making a wallet...
        </HeaderText>
      </SpacerUi>
    </Header>
  );
}
