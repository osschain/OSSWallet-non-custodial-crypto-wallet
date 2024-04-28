import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components/native";

import { getFontStyle } from "@/util/themeUtils";

type Props = {
  children?: any;
  left?: ReactNode;
  right?: ReactNode;
} & ComponentPropsWithoutRef<typeof Input>;

const InputContainer = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-radius: 14px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  background-color: ${({ theme }) => theme.colors["bg-input"]};
`;
// prettier-ignore

const Input = styled.TextInput`
  border-radius: 14px;
  padding: ${({ theme }) => theme.spaces["xl"]} 0;

  flex: 1;
  color: ${({ theme }) => theme.colors["text-second"]};
  font-family: ${({ theme }) => getFontStyle(theme, "body", "medium")};
`;

const RightContent = styled.View`
  justify-content: center;
  margin: 0 ${({ theme }) => theme.spaces["lg"]};
`;

const LeftContent = styled.View`
  justify-content: center;
  margin: 0 ${({ theme }) => theme.spaces["lg"]};
`;

const TextInputUi = ({ left, right, ...rest }: Props) => {
  return (
    <InputContainer>
      {left && <LeftContent>{left}</LeftContent>}
      <Input {...rest} />
      {right && <RightContent>{right}</RightContent>}
    </InputContainer>
  );
};

export default TextInputUi;
