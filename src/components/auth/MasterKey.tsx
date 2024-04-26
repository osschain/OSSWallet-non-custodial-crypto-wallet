import { View } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { defaultImage } from "@/util/DefaultImage";

const Header = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

const HeaderText = styled(HeaderTextUi)`
  /* font-size: 40px; */
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin-top: auto;
  margin-bottom: 48px;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const MasterKeyList = styled.FlatList``;

const randomWords = [
  { key: "apple" },
  { key: "banana" },
  { key: "carrot" },
  { key: "dog" },
  { key: "elephant" },
  { key: "fountain" },
];
const another = [
  { key: "guitar" },
  { key: "helicopter" },
  { key: "iguana" },
  { key: "jellyfish" },
  { key: "kangaroo" },
  { key: "laptop" },
];
const Continue = styled(ButtonUi)``;

export default function MasterKey() {
  return (
    <>
      <SpacerUi size="4xl" />
      <Header>
        <Logo
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText adjustsFontSizeToFit size="3xl" weight="extra">
            Crypto Wallet
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            Write these 12 words in exactly that order and hide them in a safe
            place.
          </DescriptionText>
        </SpacerUi>
      </Header>
      <SpacerUi size="2xl" />
      <View style={{ flexDirection: "row" }}>
        <MasterKeyList
          style={{ width: "60%" }}
          data={randomWords}
          contentContainerStyle={{ gap: 20, padding: 10 }}
          renderItem={({ item, index }) => (
            <BodyTextUi size="lg" weight="medium">
              <BodyTextUi color="text-second" size="lg" weight="medium">
                {index + 1} .
              </BodyTextUi>{" "}
              {item.key}
            </BodyTextUi>
          )}
        />

        <MasterKeyList
          data={another}
          contentContainerStyle={{ gap: 20, padding: 10 }}
          renderItem={({ item, index }) => (
            <BodyTextUi size="lg" weight="medium">
              <BodyTextUi color="text-second" size="lg" weight="medium">
                {index + 7} .
              </BodyTextUi>{" "}
              {item.key}
            </BodyTextUi>
          )}
        />
      </View>
      <Footer>
        <Continue>Continue</Continue>
      </Footer>
    </>
  );
}
