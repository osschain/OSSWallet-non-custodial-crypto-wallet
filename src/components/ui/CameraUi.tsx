import { CameraView, useCameraPermissions } from "expo-camera";
import { ComponentPropsWithRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spaces["2xl"]};
`;

const CameraContainer = styled.View`
  flex: 1;
`;

const Camera = styled(CameraView)`
  flex: 1;
`;

const StyledHeaderTextUi = styled(HeaderTextUi)`
  text-align: center;
`;

const Button = styled(ButtonUi)`
  margin-top: ${({ theme }) => theme.spaces["2xl"]};
`;

export default function CameraUi({
  ...rest
}: ComponentPropsWithRef<typeof CameraView>) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <Container>
        <StyledHeaderTextUi size="xl" style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </StyledHeaderTextUi>
        <Button variant="primary" onPress={requestPermission}>
          Grant Permission{" "}
        </Button>
      </Container>
    );
  }

  return (
    <CameraContainer>
      <Camera {...rest} />
    </CameraContainer>
  );
}
