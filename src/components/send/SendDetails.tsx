import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "../ui/BodyTextUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import SpacerUi from "../ui/SpacerUi";

import { tokenType } from "@/@types/assets";

const SendDetails = ({
  details,
  loading,
}: {
  details: tokenType | undefined | null;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      loading && (
        <SpacerUi size="4xl">
          <ActivityIndicator />
        </SpacerUi>
      )
    );
  }
  //   if (!details) {
  //     return null;
  //   }

  return (
    <>
      <HeaderTextUi style={{ textAlign: "center" }}>Transfer</HeaderTextUi>
      <SpacerUi size="4xl">
        <HeaderTextUi size="xl" style={{ textAlign: "center" }}>
          -50 OSS
        </HeaderTextUi>
      </SpacerUi>
      <SpacerUi size="4xl">
        <Details>
          <Detail
            label={`${t("wallet.home.send.send-details.asset")}:`}
            value={details?.name}
          />
          <SpacerUi size="xl">
            <Detail
              label={`${t("wallet.home.send.send-details.from")}:`}
              value={details?.symbol}
            />
          </SpacerUi>

          <SpacerUi size="xl">
            <Detail label="to:" value={details?.symbol} />
          </SpacerUi>
        </Details>
      </SpacerUi>

      <SpacerUi size="xl">
        <Details>
          <Detail
            label={`${t("wallet.home.send.send-details.fee")}:`}
            value={details?.name}
          />
          <SpacerUi size="xl">
            <Detail
              label={`${t("wallet.home.send.send-details.max-total")}:`}
              value={details?.symbol}
            />
          </SpacerUi>
        </Details>
      </SpacerUi>
    </>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
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

const Details = styled.View`
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

export default SendDetails;
