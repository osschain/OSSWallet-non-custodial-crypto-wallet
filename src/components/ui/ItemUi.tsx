import { Image } from "expo-image";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "./BodyTextUi";
import HeaderTextUi from "./HeaderTextUi";

type Props = {
  uri?: string;
  title: string;
  description?: string;
  right?: ReactNode;
  descUri?: string;
} & ComponentPropsWithoutRef<typeof Item>;

export default function ItemUi({
  uri,
  descUri,
  title,
  description,
  right,
}: Props) {
  return (
    <Item>
      <Content>
        <ImgContainer>
          <ItemImg source={{ uri }} />
          {descUri && <DescImg source={descUri} />}
        </ImgContainer>

        <View>
          <HeaderTextUi>{title}</HeaderTextUi>
          {description && <BodyTextUi>{description}</BodyTextUi>}
        </View>
      </Content>
      {right && <View>{right}</View>}
    </Item>
  );
}
const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Content = styled.View`
  flex-direction: row;
  gap: 22px;
  align-items: center;
`;

const ItemImg = styled(Image)`
  width: ${({ theme }) => theme.sizes["2xl"]};
  height: ${({ theme }) => theme.sizes["2xl"]};
`;
const DescImg = styled(Image)`
  width: 25px;
  height: 25px;
  position: absolute;

  right: -60%;
  top: 45%;
`;
const ImgContainer = styled(View)`
  position: relative;
`;
