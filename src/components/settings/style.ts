import styled from "styled-components/native";

export const Setting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spaces["xl"]};

  border-width: 1px;
  border-radius: ${({ theme }) => theme.sizes["md"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;
export const Icon = styled.View`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors["blue-500"]};
`;
export const Title = styled.View``;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["2xl"]};
`;

export const Right = styled.View`
  background-color: "red";
`;
