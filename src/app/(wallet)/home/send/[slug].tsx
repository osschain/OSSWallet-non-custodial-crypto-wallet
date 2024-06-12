import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
import SendConfirm from "@/components/send/SendConfirm";
import SendDetails from "@/components/send/SendDetails";
import AssetQuantityInputUi from "@/components/ui/AssetQuantityInputUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import {
  BodyUi,
  ContainerUi,
  FooterUi,
  ScrollContainerUi,
} from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { sendTransaction } from "@/services/send.service";
import { findAsset } from "@/util/findAsset";

export default function SendChain() {
  const [address, setAddress] = useState("");
  const [amount, setAmont] = useState("");

  const { t } = useTranslation();
  const { slug } = useLocalSearchParams();
  const { data: assetManager, isError } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);

  const sendConfirm = useRef<BottomSheetModal>(null);

  const handleApproveModalPress = () => {
    sendConfirm.current?.present();
  };

  if (isError || !asset) {
    return (
      <ContainerUi>
        <SpacerUi>
          <MessageUi> t("shared.asset-error")</MessageUi>
        </SpacerUi>
      </ContainerUi>
    );
  }

  const sendHandler = async () => {
    try {
      await sendTransaction({
        privateKey: asset?.account.privateKey as string,
        toAddress: address,
        blockchain: asset.blockchain,
        contractAddress: asset.contractAddress,
        amount,
      });

      Alert.alert(
        t("wallet.home.send.send-details.asset-sent-title"),
        t("wallet.home.send.send-details.asset-sent-message")
      );
    } catch {
      console.log("error");
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.cant-send-transaction-error")
      );
    }
  };

  const confirmSend = () => {
    if (!isAddress(address) || !Number(amount)) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.inputs-value-error")
      );
      return;
    }

    handleApproveModalPress();
  };

  return (
    <ScrollContainerUi>
      <SendConfirm ref={sendConfirm} onConfirm={sendHandler}>
        <SendDetails details={undefined} loading={false} />
      </SendConfirm>

      <Stack.Screen options={{ title: `${t("shared.send")} ${asset?.name}` }} />
      <BodyUi>
        <SpacerUi size="3xl">
          <MessageUi>{t("wallet.home.send.warning")}</MessageUi>
        </SpacerUi>

        <SpacerUi size="2xl">
          <HeaderTextUi>{t("wallet.home.send.for-whom")}</HeaderTextUi>
          <SpacerUi size="lg">
            <TextInputUi
              onChangeText={(text) => setAddress(text)}
              value={address}
              placeholder={t(
                "wallet.home.send.send-details.addres-input-placeholder"
              )}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <AssetQuantityInputUi
              onChangeText={(text) => setAmont(text)}
              value={amount}
              uri={asset.icon}
              title={asset.symbol}
            />
          </SpacerUi>
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <Button onPress={confirmSend} variant="primary">
          {t("shared.send")}
        </Button>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const Button = styled(ButtonUi)``;
