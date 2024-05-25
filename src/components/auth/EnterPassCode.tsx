import { useState } from "react";
import { FlatList, ScrollView } from "react-native";
import styled, { useTheme } from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";

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
    <Container>
      <Body>
        <SpacerUi size="4xl">
          <SpacerUi size="3.5xl">
            <HeaderText size="md" color="text-second" weight="medium">
              {header}
            </HeaderText>
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="3xl">
          <ScrollView>
            <Inputs>
              {inputs.map((input, index) => {
                return (
                  <Input key={index}>
                    <HeaderTextUi weight="bold" size="3xl">
                      {input !== null && "*"}
                    </HeaderTextUi>
                  </Input>
                );
              })}
            </Inputs>
          </ScrollView>
        </SpacerUi>
      </Body>

      <Footer>
        <CustomKeyboard>
          <FlatList
            data={keys}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              alignItems: "center",
              gap: pixelToNumber(theme.sizes["xl"]),
            }}
            contentContainerStyle={{ gap: pixelToNumber(theme.sizes["xl"]) }}
            renderItem={({ item: key }) => (
              <Key onPress={() => handleKeyPress(key)}>
                <HeaderTextUi size="2xl" weight="bold">
                  {key}
                </HeaderTextUi>
              </Key>
            )}
          />
        </CustomKeyboard>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

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
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
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
  align-items: center;
`;

export default EnterPassCode;
