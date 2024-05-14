import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";

type Props = {
  uri?: string;
  title?: string;
  collection?: string;
};

const NftItem = ({
  uri,
  title = "cantDisplay",
  collection = "can't Display",
}: Props) => {
  return (
    <ItemContainer>
      <BodyContainer>
        {uri ? (
          <NftImage source={{ uri }} />
        ) : (
          <NftImage source={require("@/assets/images/nftDefaultIMage.png")} />
        )}
      </BodyContainer>
      <FooterContainer>
        <BlurBackground>
          <Image
            source={require("@/assets/images/nftDefaultIMage.png")}
            style={{ height: "100%" }}
            blurRadius={10}
          />
        </BlurBackground>
        <Bacground />
        <Title
          color="pure-white"
          size="xl"
          weight="bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Title>
        <Collection
          color="pure-white"
          weight="medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {collection}
        </Collection>
      </FooterContainer>
    </ItemContainer>
  );
};

const ItemContainer = styled.View``;

const BodyContainer = styled.View``;
const NftImage = styled.Image`
  height: 162px;
  border-top-right-radius: ${({ theme }) => theme.sizes["md"]};
  border-top-left-radius: ${({ theme }) => theme.sizes["md"]};
`;

const FooterContainer = styled.View`
  border-bottom-right-radius: ${({ theme }) => theme.sizes["md"]};
  border-bottom-left-radius: ${({ theme }) => theme.sizes["md"]};
  overflow: hidden;
`;

const BlurBackground = styled.View`
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  max-width: 100%;
`;

const Bacground = styled.View`
  opacity: 0.4;
  background-color: #141a21;
  width: 100%;
  height: 100%;
  position: absolute;
  max-width: 100%;
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

export default NftItem;
