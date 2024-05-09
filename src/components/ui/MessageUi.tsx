import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components/native";

import BodyTextUi from "./BodyTextUi";

type Props = ComponentPropsWithoutRef<typeof Container>;

export default function MessageUi({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      <BodyTextUi style={{ textAlign: "center" }} color="text-second">
        {children}
      </BodyTextUi>
    </Container>
  );
}

const Container = styled.View`
  border-radius: ${({ theme }) => theme.sizes["md"]};
  padding: ${({ theme }) => theme.spaces["3xl"]};
  background-color: ${({ theme }) => theme.colors["bg-third"]};
`;
