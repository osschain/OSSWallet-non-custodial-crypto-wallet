import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { defaultImage } from "@/util/DefaultImage";

type Props = {
  assetName?: string;
  uri?: string;
  assetAmount?: number;
  usdAmount?: number;
} & ComponentPropsWithoutRef<typeof Item>;

const AssetItem = ({
  assetName = "TON",
  uri = defaultImage,
  assetAmount = 0,
  usdAmount = 0,
  ...rest
}: Props) => {
  return (
    <Item {...rest}>
      <LeftContent>
        <ImageContainer>
          <Icon source={{ uri }} />
        </ImageContainer>
        <View>
          <HeaderTextUi size="md">{assetName}</HeaderTextUi>
          <BodyTextUi size="sm" weight="medium" color="text-second">
            {assetAmount}
          </BodyTextUi>
        </View>
      </LeftContent>
      <RightContent>
        <BodyTextUi size="md" weight="medium">
          {usdAmount.toFixed(2)} $
        </BodyTextUi>
      </RightContent>
    </Item>
  );
};

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  padding: ${({ theme }) => theme.spaces["xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;
const LeftContent = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
const Icon = styled.Image`
  width: ${({ theme }) => theme.sizes["2xl"]};
  height: ${({ theme }) => theme.sizes["2xl"]};
  border-radius: 100px;
`;

const RightContent = styled.View``;

export default AssetItem;
