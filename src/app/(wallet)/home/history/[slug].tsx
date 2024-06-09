import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import BodyTextUi from "@/components/ui/BodyTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { getAdresses } from "@/services/balances.service";
import { findAsset } from "@/util/findAsset";

export default function HistoryDetails() {
  const [isFromCopied, setIsFromCopied] = useState(false);
  const [isToCopied, setIsToCopied] = useState(false);

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const item = useLocalSearchParams();
  const asset = findAsset(assets, item.slug as string);

  const isRecieved = (from: string | undefined): boolean | undefined => {
    if (!assets || !from) return;
    const adresses = getAdresses(assets);
    const isFromMe = adresses.find(
      (adress) => adress.address.toLowerCase() === from.toLowerCase()
    );

    if (isFromMe) {
      return false;
    } else if (!isFromMe) {
      return true;
    }
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
  return (
    <ScrollContainerUi>
      {/* <Stack.Screen options={{ title: nft?.title }} /> */}
      <BodyUi>
        <SpacerUi size="2xl">
          <Header>
            <Image source={asset?.icon} style={{ width: 50, height: 50 }} />
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
              label="Recipent"
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
              label="From"
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
              label="Amount"
              value={`${item.value}  ${asset?.symbol}`}
            />
            <HistoryProperty
              label="nonce"
              value={(item.nonce as string) || "Can't find"}
            />
            <HistoryProperty label="date" value={item.date as string} />
          </HistoryProperties>
        </SpacerUi>
      </BodyUi>
    </ScrollContainerUi>
  );
}
const HistoryProperty = ({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: ReactNode;
}) => (
  <Row>
    <LeftContent>
      <BodyTextUi weight="medium">{label}</BodyTextUi>
    </LeftContent>
    <RightContent>
      <BodyTextUi
        style={{ width: "90%" }}
        numberOfLines={1}
        weight="medium"
        color="text-second"
      >
        {value}
      </BodyTextUi>
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
