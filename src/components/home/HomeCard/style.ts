import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import HeaderTextUi from "@/components/ui/HeaderTextUi";

const { width } = Dimensions
  .get("window");


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



export const WalletAdressContainer = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["lg"]};
`;

export const CopyAddres = styled.TouchableOpacity``;

export const MoneyAmount = styled(HeaderTextUi)`
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
  gap:  ${({ theme }) => width <= 375 ? theme.spaces["md"] : theme.spaces["lg"]};
  position: relative;
  align-items: center;
  padding:  ${({ theme }) => theme.spaces["lg"]} ;
`;
export const ButtonIcon = styled.View``;
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

export const TopRight = styled.View`
top: ${({ theme }) => theme.spaces["xl"]};
position: absolute;
flex-direction: row;
right: ${({ theme }) => theme.spaces["xl"]};
gap: ${({ theme }) => theme.spaces["lg"]};

`;

export const NotificationContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -10px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors["blue-100"]};

`;

