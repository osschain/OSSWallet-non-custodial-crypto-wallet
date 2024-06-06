import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled, { useTheme } from "styled-components/native";

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
  padding: ${({ theme }) => theme.spaces["xl"]} ${({ theme }) => theme.spaces["lg"]};
  
  flex: 1;
  color: ${({ theme }) => theme.colors["text-second"]};
  font-family: ${({ theme }) => getFontStyle(theme, "body", "medium")};
`;

const RightContent = styled.View`
  justify-content: center;
  margin-right: ${({ theme }) => theme.spaces["lg"]};
`;

const RightAreaContent = styled.View`
  justify-content: flex-end;
  margin-right: ${({ theme }) => theme.spaces["lg"]};
  margin-bottom: ${({ theme }) => theme.spaces["lg"]};
`;

const LeftContent = styled.View`
  justify-content: center;
  margin-left: ${({ theme }) => theme.spaces["lg"]};
`;

export const TextInputUi = ({ left, right, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <InputContainer>
      {left && <LeftContent>{left}</LeftContent>}
      <Input placeholderTextColor={theme.colors.placeholder} {...rest} />
      {right && <RightContent>{right}</RightContent>}
    </InputContainer>
  );
};

export const TextAreaInputUi = ({ left, right, ...rest }: Props) => {
  return (
    <InputContainer>
      {left && <LeftContent>{left}</LeftContent>}
      <Input {...rest} textAlignVertical="top" />
      {right && <RightAreaContent>{right}</RightAreaContent>}
    </InputContainer>
  );
};
