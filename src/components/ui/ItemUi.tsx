import { Image } from "expo-image";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import HeaderTextUi from "./HeaderTextUi";

type Props = {
  uri?: string;
  title: string;
  leftBottom?: ReactNode;
  right?: ReactNode;
  descUri?: string;
} & ComponentPropsWithoutRef<typeof Item>;

export default function ItemUi({
  uri,
  descUri,
  title,
  leftBottom,
  right,
}: Props) {
  return (
    <Item>
      <Content>
        <ImgContainer>
          <ItemImg style={{ opacity: 1 }} source={{ uri }} />
          {descUri && <DescImg source={descUri} />}
        </ImgContainer>

        <View>
          <HeaderTextUi>{title}</HeaderTextUi>
          {leftBottom && leftBottom}
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
  width: ${({ theme }) => theme.sizes["3.5xl"]};
  height: ${({ theme }) => theme.sizes["3.5xl"]};
`;
const DescImg = styled(Image)`
  width: 27px;
  height: 27px;
  position: absolute;

  right: -30%;
  top: 50%;
`;
const ImgContainer = styled(View)`
  position: relative;
`;
