import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { ScrollContainerUi } from "../ui/LayoutsUi";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";

const passwordLength = 6;

const keys = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  <IconUi library="FontAwesome" name="remove" size="2xl" color="icon-second" />,
];

type Props = {
  onPasswordFull: (password: string) => void;
  header: string;
};

function EnterPassCode({ onPasswordFull, header }: Props) {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState(Array(passwordLength).fill(null));
  const theme = useTheme();
  const clearInputs = () => {
    setInputs(Array(passwordLength).fill(null));
  };

  const updateInputs = (item: null | number) => {
    const firstNull = inputs.indexOf(null);
    const cloneInputs = [...inputs];
    const index = item !== null ? firstNull : firstNull - 1;
    cloneInputs[index] = item;
    return cloneInputs;
  };

  const removeDigit = () => {
    const updatedInputs = updateInputs(null);
    setInputs(updatedInputs);
  };

  const checkInputs = (inputs: any[]) => {
    const isInputsFull = !inputs.includes(null);

    if (isInputsFull) {
      const password = inputs.join("");
      onPasswordFull(password);
      clearInputs();
    }
  };

  const addDigit = (digit: number) => {
    const updatedInputs = updateInputs(digit);
    setInputs(updatedInputs);
    checkInputs(updatedInputs);
  };

  const handleKeyPress = (key: number | JSX.Element) => {
    const isDigit = typeof key === "number";

    if (isDigit) {
      addDigit(key);
    } else {
      removeDigit();
    }
  };

  return (
    <ScrollContainerUi>
      <Body>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <BannerImage
            resizeMode="contain"
            source={require("@/assets/images/ossLogo.png")}
          />
          <SpacerUi size="lg">
            <HeaderTextUi adjustsFontSizeToFit size="3xl" weight="bold">
              {t("auth.index.header")}
            </HeaderTextUi>
            <HeaderTextUi
              style={{ textAlign: "right", marginTop: -15 }}
              adjustsFontSizeToFit
              size="sm"
              weight="bold"
            >
              By OSS
            </HeaderTextUi>
          </SpacerUi>
        </View>
        <SpacerUi size="4xl">
          <HeaderText size="md" color="text-second" weight="medium">
            {header}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="3xl">
          <Inputs>
            {inputs.map((input, index) => {
              return (
                <Input key={index}>
                  <HeaderTextUi
                    weight="bold"
                    size="3xl"
                    style={{ lineHeight: 62 }}
                  >
                    {input !== null && "*"}
                  </HeaderTextUi>
                </Input>
              );
            })}
          </Inputs>
        </SpacerUi>
      </Body>

      <Footer>
        <CustomKeyboard>
          {keys.map((key, index) => {
            return (
              <KeyWrapper key={index}>
                <Key onPress={() => handleKeyPress(key)}>
                  <HeaderTextUi size="2xl" weight="bold">
                    {key}
                  </HeaderTextUi>
                </Key>
              </KeyWrapper>
            );
          })}
        </CustomKeyboard>
      </Footer>
    </ScrollContainerUi>
  );
}

const Body = styled.View`
  flex: 1;
  justify-content: center;
`;

const HeaderText = styled(HeaderTextUi)`
  text-align: center;
`;

const Inputs = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.View`
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  border-radius: 100px;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["3xl"]} 0;
  justify-content: center;
`;

const KeyWrapper = styled.View`
  width: 33%;
  align-items: center;
  margin-top: ${({ theme }) => theme.spaces["xl"]};
`;
const Key = styled.TouchableOpacity`
  border-radius: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  align-items: center;
  width: ${({ theme }) => theme.sizes["5xl"]};
  height: ${({ theme }) => theme.sizes["5xl"]};
`;

const CustomKeyboard = styled.View`
  width: 85%;
  margin: auto;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const BannerImage = styled.Image`
  width: 100px;
  height: 100px;
`;
export default EnterPassCode;
