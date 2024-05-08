import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import { getFontStyle } from "@/util/themeUtils";
export const Card = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  position: relative;
`;
export const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  border-radius: ${({ theme }) => theme.sizes["lg"]};
`;
export const Header = styled.View``;

export const UserName = styled(HeaderTextUi)`
  text-transform: uppercase;
`;

export const WalletAdressContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["lg"]};
`;
export const WalletAdress = styled(BodyTextUi)``;

export const CopyAddres = styled.TouchableOpacity``;

export const MoneyAmount = styled(HeaderTextUi)`
  color: ${({ theme }) => theme.colors["pure-white"]};
  font-size: 28px;
  font-family: ${({ theme }) => getFontStyle(theme, "heading", "bold")};
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spaces["lg"]};
`;
// prettier-ignore
export const Button = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  gap: ${({theme}) => theme.spaces["lg"]};
  position: relative;
  align-items: center;
  padding:  ${({theme}) => theme.spaces["lg"]} ;

`;
export const ButtonIcon = styled.View``;
export const ButtonText = styled(BodyTextUi)``;
export const ButtonBacground = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  background-color: ${({ theme }) => theme.colors["pure-white"]};
  opacity: 0.2;
  border-radius: ${({ theme }) => theme.sizes["lg"]};
`;

export const Options = styled.TouchableOpacity`
  position: absolute;
  color: ${({ theme }) => theme.colors["pure-white"]};
  top: ${({ theme }) => theme.spaces["xl"]};
  right: ${({ theme }) => theme.spaces["xl"]};
`;
