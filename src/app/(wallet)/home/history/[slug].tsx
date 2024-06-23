import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import TruncatedText from "@/components/ui/TruncatedTextUi";
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
  const { t } = useTranslation();
  const [isFromCopied, setIsFromCopied] = useState(false);
  const [isToCopied, setIsToCopied] = useState(false);

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const item = useLocalSearchParams();
  const asset = findAsset(assets, item.slug as string);

  const isRecieved = (from: string | undefined): boolean | undefined => {
    if (!assets || !from) return;

    const isFromMe = assetManager.addresses.find(
      (adress) => adress.address.toLowerCase() === from.toLowerCase()
    );

    return !isFromMe;
  };

  const copyFrom = async () => {
    await Clipboard.setStringAsync(item.from as string);
    setIsFromCopied(true);
    setIsToCopied(false);
  };

  const copyTo = async () => {
    await Clipboard.setStringAsync(item.from as string);
    setIsToCopied(true);
    setIsFromCopied(false);
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

  return (
    <ScrollContainerUi>
      {/* <Stack.Screen options={{ title: nft?.title }} /> */}
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
          <HistoryProperties>
            <HistoryProperty
              isTruncated
              label={t("shared.recipent")}
              value={item.to as string}
              action={
                <IconUi
                  onPress={copyTo}
                  library="Feather"
                  name={isToCopied ? "check" : "copy"}
                  size="lg"
                  color="icon-second"
                />
              }
            />
            <HistoryProperty
              isTruncated
              label={t("shared.from")}
              value={item.from as string}
              action={
                <IconUi
                  onPress={copyFrom}
                  library="Feather"
                  name={isFromCopied ? "check" : "copy"}
                  size="lg"
                  color="icon-second"
                />
              }
            />
            <HistoryProperty
              label={t("shared.amount")}
              value={`${item.value}  ${asset?.symbol}`}
            />
            <HistoryProperty
              label={t("shared.nonce")}
              value={(item.nonce as string) || ""}
            />
            <HistoryProperty
              label={t("shared.date")}
              value={item.date as string}
            />
          </HistoryProperties>
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
const HistoryProperty = ({
  label,
  value,
  action,
  isTruncated,
}: {
  label: string;
  value: string;
  action?: ReactNode;
  isTruncated?: boolean;
}) => (
  <Row>
    <LeftContent>
      <BodyTextUi weight="medium">{label}</BodyTextUi>
    </LeftContent>
    <RightContent>
      {isTruncated ? (
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
  </Row>
);

const Header = styled.View`
  align-items: center;
`;

const HistoryProperties = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
  gap: 15px;
`;

const LeftContent = styled.View``;

const RightContent = styled.View`
  flex-direction: row;
  width: 70%;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HistoryImage = styled(Image)`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
`;
