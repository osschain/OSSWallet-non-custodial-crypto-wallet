import { ReactNode } from "react";
import styled from "styled-components/native";

import BodyTextUi from "./BodyTextUi";
import CopyUi from "./CopyUi";
import TruncatedText from "./TruncatedTextUi";

export const PropertiesUi = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  gap: 12px;
`;

type PropertUiType = {
  label: string;
  value: string;
  action?: ReactNode;
  truncated?: boolean;
  copy?: boolean;
};
export const PropertyUi = ({
  label,
  value,
  action,
  truncated = false,
  copy = false,
}: PropertUiType) => (
  <RowBetween>
    <LeftContent>
      <Row>
        <BodyTextUi weight="medium">{label} </BodyTextUi>
        {copy && <CopyUi text={value} />}
      </Row>
    </LeftContent>

    <RightContent>
      {truncated ? (
        <TruncatedText
          endLength={7}
          startLength={7}
          maxLength={7}
          text={value}
        />
      ) : (
        <BodyTextUi weight="medium" color="text-second">
          {value}
        </BodyTextUi>
      )}
      {action && action}
    </RightContent>
  </RowBetween>
);

const LeftContent = styled.View``;

const RightContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RowBetween = styled.View`
  gap: 2px;
  justify-content: space-between;
`;
