import { ComponentPropsWithoutRef } from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

import { TextInputUi } from "./TextInputUi";
import BodyTextUi from "./BodyTextUi";
import { defaultImage } from "@/util/DefaultImage";

type Props = {
  uri: string;
  title: string;
  usdQuantity: number;
} & ComponentPropsWithoutRef<typeof TextInputUi>;

export default function AssetQuantityInputUi({
  uri = defaultImage,
  title = "OSS",
  usdQuantity = 300,
}: Props) {
  return (
    <View>
      <TextInputUi
        right={
          <RightContainer>
            <UsdQuantityContainer>
              <BodyTextUi weight="medium" color="text-second">
                ~ {usdQuantity} USD
              </BodyTextUi>
            </UsdQuantityContainer>
            <AssetContainer>
              <Image source={{ uri }} width={24} height={24} />
              <BodyTextUi weight="medium">{title}</BodyTextUi>
            </AssetContainer>
          </RightContainer>
        }
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

  padding: ${({ theme }) => theme.spaces["lg"]}
    ${({ theme }) => theme.spaces["3xl"]};
  border: 1px;
  border-radius: ${({ theme }) => theme.sizes["sm"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
  background-color: "red";
`;

const UsdQuantityContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
