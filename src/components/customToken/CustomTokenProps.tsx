import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";

import { PropertiesUi, PropertyUi } from "../ui/PropertyUi";
import SpacerUi from "../ui/SpacerUi";

import { tokenType } from "@/@types/assets";

const CustomTokenProps = ({
  tokenProperties,
  loading,
}: {
  tokenProperties: tokenType | undefined | null;
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
  if (!tokenProperties) {
    return null;
  }

  return (
    <PropertiesUi>
      <PropertyUi
        label={`${t("wallet.home.custom-token.add-custom-token.name")}:`}
        value={tokenProperties.name}
      />
      <PropertyUi
        label={`${t("wallet.home.custom-token.add-custom-token.symbol")}:`}
        value={tokenProperties.symbol}
      />
      <PropertyUi
        label={`${t("wallet.home.custom-token.add-custom-token.decimals")}:`}
        value={tokenProperties.decimals.toString()}
      />
    </PropertiesUi>
  );
};

export default CustomTokenProps;
