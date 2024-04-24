import React, { ComponentPropsWithoutRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
  border-bottom-width: 0.2px;
  border-color: ${($props) => $props.theme.colors["blue-500"]};
`;

const SegmentLabel = styled(BodyTextUi)<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive
      ? props.theme.colors["blue-500"]
      : props.theme.colors["text-second"]};
`;

const LabelContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const ActiveBox = styled(Animated.View)`
  position: absolute;
  border-radius: 10px;
  height: 4px;
  bottom: -2px;
  background-color: blue;
`;

type Props = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
} & ComponentPropsWithoutRef<typeof Container>;

const defaultOptions = ["first", "second", "third"];

const SegmentedControl: React.FC<Props> = React.memo(
  ({
    options = defaultOptions,
    selectedOption = defaultOptions[0],
    onOptionPress,
    ...rest
  }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 20;
    const segmentedControlWidth = windowWidth;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) +
            internalPadding / 2 +
            itemWidth / 4
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <Container
        style={[
          {
            width: segmentedControlWidth,
            paddingLeft: internalPadding / 2,
          },
        ]}
        {...rest}
      >
        <ActiveBox
          style={[
            {
              width: itemWidth / 2,
              backgroundColor: "red",
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <LabelContainer
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
              ]}
            >
              <SegmentLabel
                isActive={option === selectedOption}
                size="lg"
                weight="medium"
              >
                {option}
              </SegmentLabel>
            </LabelContainer>
          );
        })}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  activeBox: {
    position: "absolute",
    borderRadius: 10,
    height: 4,
    bottom: -2,
    backgroundColor: "blue",
  },
});

export { SegmentedControl };
