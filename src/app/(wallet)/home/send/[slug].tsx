import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import { useAssetPrices, useAssets } from "@/app/api/assets";
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
import { useAuth } from "@/providers/AuthProvider";
import { fetchGasFee, sendTransaction } from "@/services/send.service";
import { decrypt } from "@/util/es";
import { findAsset } from "@/util/findAsset";

export type DetailsType = {
  name: string; // Name of the asset
  symbol: string; // Symbol of the asset
  from: string;
  to: string; // Recipient address or identifier
  fee: number; // Transaction fee
  maxTotal: number | null; // Maximum total value, might be a string representing a large number,
  amount: string;
};

export default function SendChain() {
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState<DetailsType | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [gasFeeWey, setGasFeeWey] = useState<number | undefined>();

  const [amount, setAmont] = useState("");
  const { setupPass } = useAuth();
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams();
  const { data: assetManager, isError } = useAssets();
  const assets = assetManager?.assets;
  const asset = findAsset(assets, slug as string);
  const { data: assetPrices } = useAssetPrices();
  const sendConfirm = useRef<BottomSheetModal>(null);

  const handleApproveModalPress = () => {
    sendConfirm.current?.present();
  };

  const getPrice = (symbol: string) =>
    assetPrices?.find((asset) => asset.symbol === symbol)?.price.toFixed(4) ||
    null;

  if (isError || !asset) {
    return (
      <ContainerUi>
        <SpacerUi>
          <MessageUi> t("shared.asset-error")</MessageUi>
        </SpacerUi>
      </ContainerUi>
    );
  }

  const getGasFee = async () => {
    const gasFee = await fetchGasFee({
      contractAddress: asset.contractAddress,
      toAddress: address,
      fromAddress: asset.account.address,
      amount,
      blockchain: asset.blockchain,
    });
    return gasFee;
  };

  const sendHandler = async () => {
    try {
      const enncryptedPrivateKey = await decrypt(
        asset.account.privateKey,
        setupPass as string
      );

      if (!enncryptedPrivateKey) {
        throw new Error();
      }

      const config = {
        privateKey: enncryptedPrivateKey,
        toAddress: address,
        blockchain: asset.blockchain,
        contractAddress: asset.contractAddress,
        amount,
        gasFee: gasFeeWey as number,
        fromAddress: asset.account.address,
      };

      await sendTransaction(config);

      Alert.alert(
        t("wallet.home.send.send-details.asset-sent-title"),
        t("wallet.home.send.send-details.asset-sent-message")
      );
    } catch {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.cant-send-transaction-error")
      );
    }
  };

  const setDetaills = async () => {
    try {
      setLoadingDetails(true);
      const gasFee = await getGasFee();
      if (!gasFee) {
        throw new Error();
      }
      setGasFeeWey(gasFee?.gas_fee_wei);
      const price = getPrice(asset.symbol);

      const details: DetailsType = {
        name: asset.name,
        symbol: asset.symbol,
        to: address,
        from: asset.account.address,
        fee: gasFee?.gas_fee_wei,
        maxTotal: price ? Number(price) * Number(amount) : null,
        amount,
      };
      setDetails(details);
      setLoadingDetails(false);
    } catch {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.cant-send-transaction-error")
      );
    }
  };

  const confirmSend = async () => {
    if (!isAddress(address) || !Number(amount)) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.inputs-value-error")
      );
      return;
    }
    try {
      setDetaills();
    } catch {
      return;
    }
    handleApproveModalPress();
  };

  return (
    <ScrollContainerUi>
      <SendConfirm ref={sendConfirm} onConfirm={sendHandler}>
        <SendDetails details={details} loading={loadingDetails} />
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
