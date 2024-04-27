import styled from "styled-components/native";

export const Container = styled.View<{ height?: "full" | "auto" }>`
  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  flex: ${({ height = "full" }) => (height === "full" ? 1 : null)};
`;
