import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import MessageUi from "../ui/MessageUi";
import SpacerUi from "../ui/SpacerUi";

import { tokenType } from "@/@types/assets";

const CustomTokenProps = ({
  tokenProperties,
  loading,
}: {
  tokenProperties: tokenType | undefined | null;
  loading: boolean;
}) => {
  if (loading) {
    return (
      loading && (
        <SpacerUi size="4xl">
          <ActivityIndicator />
        </SpacerUi>
      )
    );
  }
  if (!tokenProperties) {
    return null;
  }

  return (
    <TokenProperties>
      <TokenProperty label="Name:" value={tokenProperties.name} />
      <SpacerUi size="xl">
        <TokenProperty label="Symbol:" value={tokenProperties.symbol} />
      </SpacerUi>
      <SpacerUi size="xl">
        <TokenProperty
          label="Decimals:"
          value={tokenProperties.decimals.toString()}
        />
      </SpacerUi>
    </TokenProperties>
  );
};

const TokenProperty = ({ label, value }: { label: string; value: string }) => (
  <Row>
    <LeftContent>
      <BodyTextUi weight="medium">{label}</BodyTextUi>
    </LeftContent>
    <RightContent>
      <BodyTextUi weight="medium" color="text-second">
        {value}
      </BodyTextUi>
    </RightContent>
  </Row>
);

const TokenProperties = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

const LeftContent = styled.View``;

const RightContent = styled.View``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default CustomTokenProps;
