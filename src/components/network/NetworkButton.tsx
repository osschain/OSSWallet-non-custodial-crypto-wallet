import { EvilIcons } from "@expo/vector-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { pixelToNumber } from "@/util/pixelToNumber";

const NetworkButton = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<
  typeof TouchableOpacity
>) => {
  const theme = useTheme();

  return (
    <Button variant="secondary" {...rest}>
      <FlexContainer style={{ flexDirection: "row", gap: 10 }}>
        <BodyTextUi weight="medium">{children}</BodyTextUi>
        <EvilIcons
          name="arrow-up"
          size={pixelToNumber(theme.sizes["xl"])}
          color={theme.colors["text-primary"]}
        />
      </FlexContainer>
    </Button>
  );
};

const Button = styled(ButtonUi)`
  width: 40%;
  padding: ${({ theme }) => theme.spaces["lg"]}
    ${({ theme }) => theme.spaces["lg"]};
`;

const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["md"]};
`;

export default NetworkButton;
