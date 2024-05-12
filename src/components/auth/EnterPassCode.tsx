import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView } from "react-native";
import styled from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";
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
  <FontAwesome name="remove" size={28} color="black" />,
];

type Props = {
  onPasswordFull: (password: string) => void;
  header: string;
};

function EnterPassCode({ onPasswordFull, header }: Props) {
  const [inputs, setInputs] = useState(Array(passwordLength).fill(null));

  const clearInputs = () => {
    setInputs(Array(passwordLength).fill(null));
  };

  const onKeyPress = (item: number | JSX.Element) => {
    const num = Number(item);

    if (isNaN(num)) {
      const lastNull = inputs.indexOf(null);
      const cloneInputs = [...inputs];
      cloneInputs[lastNull - 1] = null;
      setInputs(cloneInputs);
    } else {
      let isNotFillled = true;
      const fillInputs = inputs.map((input) => {
        if (!input && isNotFillled) {
          isNotFillled = false;
          return num;
        } else {
          return input;
        }
      });

      setInputs(fillInputs);

      const isInputsFull = !fillInputs.includes(null);

      if (isInputsFull) {
        const password = fillInputs.join("");
        onPasswordFull(password);
        clearInputs();
      }
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
                    <HeaderTextUi
                      style={{
                        height: 20,
                      }}
                      weight="bold"
                      size="3xl"
                    >
                      {input ? "*" : input}
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
              gap: 24,
            }}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <Key onPress={() => onKeyPress(item)}>
                <HeaderTextUi size="2xl" weight="bold">
                  {item}
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
  /* font-size: 40px; */
  text-align: center;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
`;

const Key = styled.TouchableOpacity`
  border-radius: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  align-items: center;
  width: 60px;
  height: 60px;
`;

const CustomKeyboard = styled.View`
  align-items: center;
`;

const Inputs = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.View`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 48px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  border-radius: 6px;
`;

export default EnterPassCode;
