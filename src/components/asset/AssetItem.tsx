import { SvgUri } from "react-native-svg";
import { ComponentPropsWithoutRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { defaultImage } from "@/util/DefaultImage";
import { Image } from "expo-image";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type Props = {
  assetName?: string;
  uri?: string;
  assetAmount?: number;
  usdAmount?: number;
  symbol: string;
} & ComponentPropsWithoutRef<typeof Item>;

const AssetItem = ({
  assetName = "TON",
  uri = defaultImage,
  assetAmount = 0,
  usdAmount = 0,
  symbol = "",
  ...rest
}: Props) => {
  return (
    <Item {...rest}>
      <LeftContent>
        <ImageContainer>
          <Image source={uri} style={{ width: 40, height: 40 }} />
        </ImageContainer>
        <View>
          <HeaderTextUi size="md">{assetName}</HeaderTextUi>
          <BodyTextUi size="sm" weight="medium" color="text-second">
            {assetAmount} {symbol}
          </BodyTextUi>
        </View>
      </LeftContent>
      <RightContent>
        <BodyTextUi size="md" weight="medium">
          {usdAmount} $
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

const RightContent = styled.View``;

export default AssetItem;
