import { Image as ExpoImage } from "expo-image";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
type Props = {
  uri?: string;
  title?: string;
  collection?: string;
  networkUri?: string;
};

const NftItem = ({
  uri,
  title = "",
  collection = "",
  networkUri = "",
}: Props) => {
  return (
    <Item>
      <Body>
        <NetowrkImage source={networkUri} />
        {uri ? (
          <NftImage resizeMode="cover" source={{ uri }} />
        ) : (
          <NftImage
            resizeMode="cover"
            source={require("@/assets/images/nftDefaultIMage.png")}
          />
        )}
      </Body>
      <Footer>
        <BlurBackground>
          <Image
            source={require("@/assets/images/nftDefaultIMage.png")}
            style={{ height: "100%", width: "100%" }}
            blurRadius={18}
          />
          <Overlay />
        </BlurBackground>

        <Title
          color="pure-white"
          size="lg"
          weight="bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Title>
        <Collection
          size="sm"
          color="pure-white"
          weight="medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {collection}
        </Collection>
      </Footer>
    </Item>
  );
};

const Item = styled.View``;

const Body = styled.View``;
const NftImage = styled.Image`
  height: 162px;
  width: 100%;
  border-top-right-radius: ${({ theme }) => theme.sizes["md"]};
  border-top-left-radius: ${({ theme }) => theme.sizes["md"]};
`;

const Footer = styled.View``;

const BlurBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  opacity: 0.4;
  background-color: #141a21;
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled(HeaderTextUi)`
  padding: ${({ theme }) => theme.spaces["md"]};
  padding-left: ${({ theme }) => theme.spaces["lg"]};
  padding-top: ${({ theme }) => theme.spaces["xl"]};
  max-width: 90%;
`;
const Collection = styled(BodyTextUi)`
  padding: ${({ theme }) => theme.spaces["md"]};
  padding-left: ${({ theme }) => theme.spaces["lg"]};
  padding-bottom: ${({ theme }) => theme.spaces["xl"]};
  max-width: 90%;
`;

const NetowrkImage = styled(ExpoImage)`
  position: absolute;
  top: -4px;
  right: -1px;
  height: 27px;
  width: 27px;
  z-index: 10;
`;

export default NftItem;
