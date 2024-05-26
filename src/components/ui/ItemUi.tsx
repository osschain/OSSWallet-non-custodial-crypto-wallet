import { ComponentPropsWithoutRef, ReactNode } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "./BodyTextUi";
import HeaderTextUi from "./HeaderTextUi";

type Props = {
  uri?: string;
  title: string;
  description?: string;
  right?: ReactNode;
} & ComponentPropsWithoutRef<typeof Item>;

export default function ItemUi({ uri, title, description, right }: Props) {
  return (
    <Item>
      <Content>
        <Image source={{ uri }} />
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
  gap: 20px;
  align-items: center;
`;

const Image = styled.Image`
  width: ${({ theme }) => theme.sizes["2xl"]};
  height: ${({ theme }) => theme.sizes["2xl"]};
`;
