import { View } from "react-native";
import styled from "styled-components/native";

import TextInputUi from "../ui/TextInputUi";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";

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

const Continue = styled(ButtonUi)``;

const TextInput = styled(TextInputUi)``;

export default function CheckMasterKey() {
  return (
    <>
      <SpacerUi size="4xl" />
      <Header>
        <Logo
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText size="3xl" weight="extra">
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
      <View>
        <TextInput
          left={
            <View>
              <BodyTextUi color="text-second" weight="medium">
                4 .
              </BodyTextUi>
            </View>
          }
        />
        <SpacerUi size="xl">
          <TextInput
            left={
              <View>
                <BodyTextUi color="text-second" weight="medium">
                  8 .
                </BodyTextUi>
              </View>
            }
          />
        </SpacerUi>
        <SpacerUi size="xl">
          <TextInput
            left={
              <View>
                <BodyTextUi color="text-second" weight="medium">
                  1 .
                </BodyTextUi>
              </View>
            }
          />
        </SpacerUi>
      </View>
      <Footer>
        <Continue>Continue</Continue>
      </Footer>
    </>
  );
}
