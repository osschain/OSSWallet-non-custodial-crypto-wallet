import styled from "styled-components/native";

import { variants } from "./index";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;
export const LeftContent = styled.View`
  flex-direction: row;
  flex: 1;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  background-color: #f2eff6;
`;

export const Label = styled(HeaderTextUi)`
  text-transform: capitalize;
`;
export const AssetAmount = styled(BodyTextUi)`
  color: ${({ theme }) => theme.colors["text-second"]};
  width: 40%;
`;
export const RightContent = styled.View`
  
`;

export const Amount = styled(HeaderTextUi) <{ variant: variants }>`
  color: ${(props) =>
    props.variant === "recieved"
      ? props.theme.colors["green-500"]
      : props.theme.colors["red-500"]};
`;
