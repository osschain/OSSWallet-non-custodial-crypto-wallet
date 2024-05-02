import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

const SeedLoading = () => {
  const animation = useSharedValue(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loader>
        <SettingImage
          style={[animationStyle]}
          resizeMode="contain"
          source={require("@/assets/images/setting.png")}
        />

        <SpacerUi size="3.5xl">
          <LoaderText size="2xl" weight="extra">
            Making a wallet...
          </LoaderText>
        </SpacerUi>
      </Loader>
    </>
  );
};

const Loader = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const SettingImage = styled(Animated.Image)`
  width: 100px;
  height: 100px;
`;

const LoaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

export default SeedLoading;
