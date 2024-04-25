import styled from "styled-components/native";

export const Container = styled.View<{ height: "full" | "auto" }>`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  flex: 0 ${({ height = "auto" }) => (height === "full" ? 1 : null)};
`;
