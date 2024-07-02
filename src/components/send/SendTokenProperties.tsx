import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import { PropertiesUi, PropertyUi } from "../ui/PropertyUi";
import SpacerUi from "../ui/SpacerUi";

export type SendTokenPropertiesType = {
  name: string;
  from: string;
  to: string;
  symbol: string;
  fee: number;
  maxTotal: number | null;
  amount: string;
  blockchain: string;
};

const SendTokenProperties = ({
  properties,
  loading,
}: {
  properties: SendTokenPropertiesType | null;
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

  if (!properties) {
    return (
      <AlertWithImageUI
        title={t("wallet.home.send.send-details.cant-fetch-details-error")}
      />
    );
  }

  return (
    <>
      <HeaderTextUi style={{ textAlign: "center" }}>
        {t("wallet.home.send.send-details.title")}
      </HeaderTextUi>

      <SpacerUi size="4xl">
        <HeaderTextUi size="xl" style={{ textAlign: "center" }}>
          -{properties?.amount} {properties?.symbol}
        </HeaderTextUi>
      </SpacerUi>
      <SpacerUi size="xl">
        <PropertiesUi>
          <PropertyUi
            label={`${t("wallet.home.send.send-details.asset")}:`}
            value={properties?.name}
          />
          <PropertyUi
            truncated
            copy
            label={`${t("wallet.home.send.send-details.from")}:`}
            value={properties?.from}
          />

          <PropertyUi
            truncated
            copy
            label={`${t("wallet.home.send.send-details.to")}:`}
            value={properties?.to}
          />

          <PropertyUi
            label={`${t("wallet.home.send.send-details.fee")}:`}
            value={properties?.fee + " " + properties?.symbol}
          />
          {properties.maxTotal && (
            <PropertyUi
              label={`${t("wallet.home.send.send-details.max-total")}:`}
              value={properties?.maxTotal + " $"}
            />
          )}
        </PropertiesUi>
      </SpacerUi>
    </>
  );
};

export default SendTokenProperties;
