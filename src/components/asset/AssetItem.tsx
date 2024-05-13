import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
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
          <HeaderTextUi size="md">{assetName}</HeaderTextUi>
          <BodyTextUi size="sm" weight="medium" color="text-second">
            {assetAmount}
          </BodyTextUi>
        </View>
      </LeftContent>
      <RightContent>
        <BodyTextUi size="md" weight="medium">
          {usdAmount}
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
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  border-radius: 100px;
  background-color: #0088cc;
`;
const Logo = styled.Image`
  width: ${({ theme }) => theme.sizes["xl"]};
  height: ${({ theme }) => theme.sizes["xl"]};
`;

const RightContent = styled.View``;

export default AssetItem;
