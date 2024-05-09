import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import HeaderTextUi from "../ui/HeaderTextUi";

import { defaultImage } from "@/util/DefaultImage";

type Props = {
  assetName?: string;
  uri?: string;
  assetAmount?: string;
  usdAmount?: string;
} & ComponentPropsWithoutRef<typeof Item>;

const AssetItem = ({
  assetName = "TON",
  uri = defaultImage,
  assetAmount = "697 TON",
  usdAmount = "$1520,056",
  ...rest
}: Props) => {
  return (
    <Item {...rest}>
      <LeftContent>
        <ImageContainer>
          <Logo source={{ uri }} />
        </ImageContainer>
        <View>
          <AssetName size="md">{assetName}</AssetName>
          <AssetAmount size="sm" weight="medium" color="text-second">
            {assetAmount}
          </AssetAmount>
        </View>
      </LeftContent>
      <RightContent>
        <UsdAmount size="md" weight="medium">
          {usdAmount}
        </UsdAmount>
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
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  border-radius: 100px;
  background-color: #0088cc;
`;
const Logo = styled.Image`
  width: ${({ theme }) => theme.sizes["xl"]};
  height: ${({ theme }) => theme.sizes["xl"]};
`;

const AssetName = styled(HeaderTextUi)``;
const AssetAmount = styled(BodyTextUi)``;
const RightContent = styled.View``;
const UsdAmount = styled(BodyTextUi)``;

export default AssetItem;
