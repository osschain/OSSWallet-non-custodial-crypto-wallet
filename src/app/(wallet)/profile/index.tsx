import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import { ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { SwitchUi } from "@/components/ui/SwitchUi";

export default function Profile() {
  return (
    <ScrollContainerUi>
      <SpacerUi>
        <Setting>
          <Left>
            <Icon>
              <Ionicons name="notifications" size={24} color="white" />
            </Icon>
            <Title>
              <BodyTextUi weight="medium" size="lg">
                Notification
              </BodyTextUi>
            </Title>
          </Left>
          <Right>
            <SwitchUi onSwitch={() => {}} />
          </Right>
        </Setting>
      </SpacerUi>
      <SpacerUi size="xl">
        <Link href="(wallet)/profile/change-pass-code" asChild>
          <TouchableOpacity>
            <Setting>
              <Left>
                <Icon>
                  <AntDesign name="lock" size={24} color="white" />
                </Icon>
                <Title>
                  <BodyTextUi weight="medium" size="lg">
                    Change Passcode
                  </BodyTextUi>
                </Title>
              </Left>
              <Right>
                <AntDesign name="arrowright" size={24} color="black" />
              </Right>
            </Setting>
          </TouchableOpacity>
        </Link>
      </SpacerUi>
    </ScrollContainerUi>
  );
}

const Setting = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spaces["xl"]};

  border-width: 1px;
  border-radius: ${({ theme }) => theme.sizes["md"]};
  border-color: ${({ theme }) => theme.colors["border-color"]};
`;
const Icon = styled.View`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors["blue-500"]};
`;
const Title = styled.View``;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["2xl"]};
`;

const Right = styled.View`
  background-color: "red";
`;
