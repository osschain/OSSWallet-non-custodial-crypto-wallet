import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import SpacerUi from "../ui/SpacerUi";
import { TextInputUi } from "../ui/TextInputUi";

type Props = {
  uri?: string;
  title?: string;
  onMaxPress?: () => void;
} & ComponentPropsWithoutRef<typeof TextInputUi>;

export default function SendAmountInput({
  title = "OSS",
  onMaxPress = () => {},
  ...rest
}: Props) {
  return (
    <View>
      <TextInputUi
        right={
          <View style={{ flexDirection: "row", gap: 10 }}>
            <RightContainer>
              <AssetContainer>
                <BodyTextUi weight="medium">{title}</BodyTextUi>
              </AssetContainer>
            </RightContainer>
            <SpacerUi size="lg" position="right">
              <RightContainer>
                <TouchableOpacity onPress={onMaxPress}>
                  <AssetContainer>
                    <BodyTextUi weight="medium">MAX</BodyTextUi>
                  </AssetContainer>
                </TouchableOpacity>
              </RightContainer>
            </SpacerUi>
          </View>
        }
        {...rest}
      />
    </View>
  );
}

const RightContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;
const AssetContainer = styled.View`
  flex-direction: row;

  gap: ${({ theme }) => theme.spaces["xl"]};

  padding: 6px ${({ theme }) => theme.spaces["3xl"]};
  border: 1px;
  border-radius: ${({ theme }) => theme.sizes["sm"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
  background-color: "red";
`;
