import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import { BodyUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import { PropertiesUi, PropertyUi } from "@/components/ui/PropertyUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { findAsset } from "@/util/findAsset";

const blockExplorer = {
  eth: "https://etherscan.io/tx",
  bsc: "https://bscscan.com/tx",
  polygon: "https://polygonscan.com/tx",
  polygon_zkevm: "https://zkevm.polygonscan.com/tx",
  avalanche: "https://subnets.avax.network/c-chain/tx",
  optimism: "https://optimistic.etherscan.io/tx",
};

const explorers = [
  "eth",
  "bsc",
  "polygon",
  "polygon_zkevm",
  "avalanche",
  "optimism",
];

export default function HistoryDetails() {
  const item = useLocalSearchParams();

  const { t } = useTranslation();

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const asset = findAsset(assets, item.slug as string);

  const isRecieved = (from: string | undefined): boolean | undefined => {
    if (!assets || !from) return;
    console.log(assetManager.addresses);
    const isFromMe = assetManager.addresses.find((adress) => {
      return adress.address?.toLowerCase() === from?.toLowerCase();
    });

    return !isFromMe;
  };

  if (!asset || !item) {
    return (
      <AlertWithImageUI title={t("wallet.home.history.slug.alert-error")} />
    );
  }

  const blockExplorerHandler = () => {
    if (!asset.blockchain) return;
    if (!explorers.includes(asset.blockchain)) return;

    // @ts-ignore
    const url = `${blockExplorer[asset?.blockchain]}/${item.hash}`;
    router.push({
      pathname: `/web-view`,
      params: { link: url, label: t("shared.explorer") },
    });
  };

  const properties = [
    {
      label: t("shared.recipent"),
      value: item.to as string,
      truncated: true,
      copy: true,
    },
    {
      label: t("shared.from"),
      value: item.from as string,
      truncated: true,
      copy: true,
    },
    { label: t("shared.amount"), value: `${item.value} ${asset?.symbol}` },
    { label: t("shared.nonce"), value: (item.nonce as string) || "" },
    { label: t("shared.date"), value: item.date as string },
  ];

  return (
    <ScrollContainerUi>
      <BodyUi>
        <SpacerUi size="2xl">
          <Header>
            <HistoryImage source={asset?.icon} />
            <SpacerUi size="lg">
              <BodyTextUi weight="semi">
                {isRecieved(item.from as string) ? "Recieved: " : "Sent: "}
                {item.value} {asset?.symbol}
              </BodyTextUi>
            </SpacerUi>
          </Header>
        </SpacerUi>
        <SpacerUi size="4xl">
          <PropertiesUi>
            {properties.map(
              (property, index) =>
                property.value && (
                  <PropertyUi
                    key={index}
                    truncated={property.truncated}
                    label={property.label}
                    value={property.value}
                    copy={property.copy}
                  />
                )
            )}
          </PropertiesUi>
        </SpacerUi>

        <SpacerUi size="2xl">
          <ButtonUi onPress={blockExplorerHandler} variant="secondary">
            <BodyTextUi color="blue-700">
              {t("wallet.home.history.slug.block-explorer")}
            </BodyTextUi>
          </ButtonUi>
        </SpacerUi>
      </BodyUi>
    </ScrollContainerUi>
  );
}

const Header = styled.View`
  align-items: center;
`;

const HistoryImage = styled(Image)`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
`;
