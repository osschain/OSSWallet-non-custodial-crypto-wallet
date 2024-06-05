import { isAddress } from "ethers";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import { useAssets } from "@/app/api/assets";
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
  const { data: assets, isError } = useAssets();

  const asset = findAsset(assets, slug as string);

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

      Alert.alert("Sent", "Asset Sent");
    } catch {
      console.log("error");
      Alert.alert(
        "..ops",
        "sorry there is error can't send transaction try later"
      );
    }
  };

  const confirmSend = () => {
    console.log(Number(amount), amount);
    if (!isAddress(address) || !Number(amount)) {
      Alert.alert("..ops", "velebi arasworadaa sheyvanili");
      return;
    }

    Alert.alert(
      "Confirm Action",
      "Are you sure you want to perform this action?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Action cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            sendHandler();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `Send ${asset?.name}` }} />
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
              placeholder="Enter Adress"
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <AssetQuantityInputUi
              onChangeText={(text) => setAmont(text)}
              value={amount}
              uri={asset.icon}
              title={asset.name}
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
