import { ReactNode } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "./BodyTextUi";
import SpacerUi from "./SpacerUi";

type Props = {
  title: string;
  image?: ReactNode;
};

const AlertWithImageUI = ({ title, image }: Props) => {
  return (
    <Container>
      <ImageContainer>
        {image ? (
          image
        ) : (
          <Image source={require("@/assets/images/AlertImage.png")} />
        )}
      </ImageContainer>
      <SpacerUi size="xl">
        <BodyTextUi size="lg" weight="bold">
          {title}
        </BodyTextUi>
      </SpacerUi>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 0 ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

// prettier-ignore
const ImageContainer = styled.View`
  padding: ${({ theme }) => theme.spaces["3xl"]} ${({ theme }) => theme.spaces["3xl"]};
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors["bg-second"]};
`;

export default AlertWithImageUI;
