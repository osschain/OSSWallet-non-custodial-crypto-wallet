import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import { useAssetPrices, useAssets } from "@/app/api/assets";
import SendAmountInput from "@/components/send/SendAddressInput";
import SendConfirm from "@/components/send/SendConfirm";
import SendTokenProperties, {
  SendTokenPropertiesType,
} from "@/components/send/SendTokenProperties";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import {
  BodyUi,
  ContainerUi,
  FooterUi,
  ScrollContainerUi,
} from "@/components/ui/LayoutsUi";
import MessageUi from "@/components/ui/MessageUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { fetchGasFee, sendTransaction } from "@/services/send.service";
import { decrypt } from "@/util/es";
import { findAsset } from "@/util/findAsset";

export type DetailsType = {
  name: string;
  symbol: string;
  from: string;
  to: string;
  fee: number;
  maxTotal: number | null;
  amount: string;
  blockchain: string;
};

export default function SendChain(): JSX.Element {
  const [address, setAddress] = useState<string>("");
  const [properties, setProperties] = useState<SendTokenPropertiesType | null>(
    null
  );
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [isTransactionCreating, setIsTransactionCreating] =
    useState<boolean>(false);
  const [gasFeeWey, setGasFeeWey] = useState<number | undefined>();
  const [amount, setAmount] = useState<string>("");
  const { setupPass } = useAuth();
  const { t } = useTranslation();

  const { slug, balance } = useLocalSearchParams<{
    slug: string;
    balance: string;
  }>();

  const { data: assetManager, isError } = useAssets();
  const asset = findAsset(assetManager?.assets, slug as string);

  const { data: assetPrices } = useAssetPrices();
  const sendConfirm = useRef<BottomSheetModal>(null);
  const scanAddress = useRef<BottomSheetModal>(null);

  if (isError || !asset) {
    return (
      <ContainerUi>
        <SpacerUi>
          <MessageUi>{t("shared.asset-error")}</MessageUi>
        </SpacerUi>
      </ContainerUi>
    );
  }

  const getPrice = (symbol: string): string | null => {
    return (
      assetPrices?.find((asset) => asset.symbol === symbol)?.price.toFixed(4) ||
      null
    );
  };

  const getGasFee = async (): Promise<
    { gas_fee_wei: number; gas_fee_native: number } | undefined
  > => {
    return await fetchGasFee({
      contractAddress: asset.contractAddress,
      toAddress: address,
      fromAddress: asset.account.address,
      amount: Number(amount),
      blockchain: asset.blockchain,
    });
  };

  const sendHandler = async (): Promise<void> => {
    try {
      setIsTransactionCreating(true);
      const decyptedPrivateKey = await decrypt(
        asset.account.privateKey,
        setupPass as string
      );
      if (!decyptedPrivateKey) throw new Error();
      await sendTransaction({
        privateKey: decyptedPrivateKey,
        toAddress: address,
        blockchain: asset.blockchain,
        contractAddress: asset.contractAddress,
        amount: Number(amount),
        gasFee: gasFeeWey as number,
        fromAddress: asset.account.address,
      });
      sendConfirm.current?.close();
      router.push(`/(wallet)/home/asset/${asset.id}`);
    } catch (error: any) {
      handleSendError(error.response?.status);
    } finally {
      setIsTransactionCreating(false);
    }
  };

  const handleSendError = (status: number | undefined): void => {
    const errorMessages: Record<number, string> = {
      409: t("wallet.home.send.send-details.wrong-fee-error"),
      500: t("wallet.home.send.send-details.no-balance-error"),
    };
    Alert.alert(
      t("shared.error-label"),
      // @ts-ignore
      errorMessages[status] ||
        t("wallet.home.send.send-details.cant-send-transaction-error")
    );
  };

  const setPropertiesAsync = async (): Promise<void> => {
    try {
      setLoadingDetails(true);
      const gasFee = await getGasFee();
      if (!gasFee) throw new Error();

      setGasFeeWey(gasFee.gas_fee_wei);
      const price = getPrice(asset.symbol);
      setProperties({
        name: asset.name,
        symbol: asset.symbol,
        to: address,
        from: asset.account.address,
        fee: Number(gasFee.gas_fee_native.toFixed(5)),
        maxTotal: price
          ? Number((Number(price) * Number(amount)).toFixed(5))
          : null,
        amount,
        blockchain: asset.blockchain,
      });
    } catch {
      // Handle error if necessary
    } finally {
      setLoadingDetails(false);
    }
  };

  const confirmSend = async (): Promise<void> => {
    if (!isAddress(address) || !Number(amount)) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.inputs-value-error")
      );
      return;
    }
    if (Number(amount) > Number(balance)) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.no-balance-error")
      );
      return;
    }
    await setPropertiesAsync();
    sendConfirm.current?.present();
  };

  return (
    <ScrollContainerUi>
      <Stack.Screen options={{ title: `${t("shared.send")} ${asset?.name}` }} />
      <SendConfirm
        isDetialsLoading={loadingDetails}
        isLoading={isTransactionCreating}
        ref={sendConfirm}
        onConfirm={sendHandler}
      >
        <SendTokenProperties properties={properties} loading={loadingDetails} />
      </SendConfirm>
      <ScannerModalUi
        ref={scanAddress}
        onBarcodeScanner={(address: string) => {
          setAddress(address);
          scanAddress.current?.close();
        }}
      />
      <BodyUi>
        <SpacerUi size="3xl">
          <MessageUi>{t("wallet.home.send.warning")}</MessageUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <HeaderTextUi>{t("wallet.home.send.for-whom")}</HeaderTextUi>
          <SpacerUi size="lg">
            <TextInputUi
              onChangeText={setAddress}
              value={address}
              right={
                <IconUi
                  library="Ionicons"
                  name="scan"
                  size="xl"
                  color="icon-second"
                  onPress={() => scanAddress.current?.present()}
                />
              }
              placeholder={t(
                "wallet.home.send.send-details.addres-input-placeholder"
              )}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="2xl">
          <SpacerUi size="lg">
            <SendAmountInput
              onChangeText={setAmount}
              onMaxPress={() => setAmount(balance || "0")}
              value={amount}
              uri={asset.icon}
              title={asset.symbol}
            />
          </SpacerUi>
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <StyledButton
          onPress={confirmSend}
          disabled={loadingDetails}
          isLoading={loadingDetails}
          variant={loadingDetails ? "secondary" : "primary"}
        >
          {t("shared.send")}
        </StyledButton>
      </FooterUi>
    </ScrollContainerUi>
  );
}

const StyledButton = styled(ButtonUi)``;
