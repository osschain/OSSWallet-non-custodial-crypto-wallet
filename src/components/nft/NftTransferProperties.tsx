import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import AlertWithImageUI from "../ui/AlertWithImageUi";
import HeaderTextUi from "../ui/HeaderTextUi";
import { PropertiesUi, PropertyUi } from "../ui/PropertyUi";
import SpacerUi from "../ui/SpacerUi";

export type NftTransferPropertiesType = {
  name: string;
  from: string;
  to: string;
  fee: string;
  symbol: string;
};

const NftTransferProperties = ({
  properties,
  loading,
}: {
  properties: NftTransferPropertiesType | null;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <SpacerUi size="4xl">
        <ActivityIndicator />
      </SpacerUi>
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
        <PropertiesUi>
          <PropertyUi
            label={`${t("wallet.home.send.send-details.asset")}:`}
            value={properties?.name}
          />
          <PropertyUi
            truncated
            label={`${t("wallet.home.send.send-details.from")}:`}
            value={properties?.from}
          />

          <PropertyUi
            truncated
            label={`${t("wallet.home.send.send-details.to")}:`}
            value={properties?.to}
          />

          <PropertyUi
            label={`${t("wallet.home.send.send-details.fee")}:`}
            value={`${properties?.fee} ${properties.symbol}`}
          />
        </PropertiesUi>
      </SpacerUi>
    </>
  );
};

export default NftTransferProperties;
