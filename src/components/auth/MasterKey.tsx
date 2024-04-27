import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";

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

const Phrase = styled(BodyTextUi)`
  flex: 1;
  padding: 2px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  border-width: 1px;
  text-align: center;
  border-radius: ${({ theme }) => theme.spaces["lg"]};
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spaces["4xl"]};
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const MasterKeyList = styled.FlatList``;

const defaultMasterKey = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "fountain",
  "guitar",
  "helicopter",
  "iguana",
  "jellyfish",
  "kangaroo",
  "laptop",
];

const Continue = styled(ButtonUi)``;

type Props = {
  masterKey: string[];
};

export default function MasterKey({ masterKey = defaultMasterKey }: Props) {
  const theme = useTheme();
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
          data={masterKey}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: pixelToNumber(theme.spaces["2xl"]),
          }}
          contentContainerStyle={{
            gap: 20,
            padding: 10,
          }}
          renderItem={({ item, index }) => (
            <Phrase size="lg" weight="medium">
              <BodyTextUi color="text-second" size="lg" weight="medium">
                {index + 1}.
              </BodyTextUi>
              {` ${item}`}
            </Phrase>
          )}
        />
      </View>
      <Footer>
        <Continue>Continue</Continue>
      </Footer>
    </>
  );
}
