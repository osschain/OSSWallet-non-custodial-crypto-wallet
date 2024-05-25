import { ComponentPropsWithoutRef, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import IconUi from "@/components/ui/IconUi";

const NetworkButton = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<
  typeof TouchableOpacity
>) => {
  return (
    <Button variant="secondary" {...rest}>
      <FlexContainer>
        <BodyTextUi weight="medium">{children}</BodyTextUi>
        <IconUi
          library="Feather"
          name="arrow-up-circle"
          size="lg"
          color="text-primary"
        />
      </FlexContainer>
    </Button>
  );
};

// prettier-ignore
const Button = styled(TouchableOpacity)`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  padding: ${({ theme }) => theme.spaces["lg"]} ${({ theme }) => theme.spaces["xl"]};
`;

const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["md"]};
`;

export default NetworkButton;
