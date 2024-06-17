import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import styled from "styled-components/native";

import { useAssetPrices, useAssets } from "@/app/api/assets";
import { UseBalances } from "@/app/api/balances";
import { Amount } from "@/components/history/history-item/style";
import SendAmountInput from "@/components/send/SendAddressInput";
import SendConfirm from "@/components/send/SendConfirm";
import SendDetails from "@/components/send/SendDetails";
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
import { calculateBalance } from "@/services/balances.service";
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
  blockhain: string;
};

export default function SendChain() {
  const [address, setAddress] = useState("");

  const [details, setDetails] = useState<DetailsType | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [isTransactionCreting, setisTransactionCreating] = useState(false);
  const { data: balances } = UseBalances();

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

  const scanAddress = useRef<BottomSheetModal>(null);

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
      amount: Number(amount),
      blockchain: asset.blockchain,
    });
    return gasFee;
  };

  const balance = calculateBalance(asset.id, balances);

  const sendHandler = async () => {
    try {
      setisTransactionCreating(true);
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
        amount: Number(amount),
        gasFee: gasFeeWey as number,
        fromAddress: asset.account.address,
      };

      await sendTransaction(config);
      sendConfirm.current?.close();
      router.push(`/(wallet)/home/asset/${asset.id}`);
    } catch (error) {
      const status = error.response.status;
      if (status === 409) {
        Alert.alert(
          t("shared.error-label"),
          t("wallet.home.send.send-details.wrong-fee-error")
        );
        setDetaills();
      } else if (status === 500) {
        Alert.alert(
          t("shared.error-label"),
          t("wallet.home.send.send-details.no-balance-error")
        );
      } else {
        Alert.alert(
          t("shared.error-label"),
          t("wallet.home.send.send-details.cant-send-transaction-error")
        );
      }
    } finally {
      setisTransactionCreating(false);
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
        fee: Number(gasFee?.gas_fee_native.toFixed(5)),
        maxTotal: price
          ? Number((Number(price) * Number(amount)).toFixed(5))
          : null,
        amount,
        blockhain: asset.blockchain,
      };
      setDetails(details);
    } catch {
    } finally {
      setLoadingDetails(false);
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
    if (Number(amount) > balance) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.send.send-details.no-balance-error")
      );
      return;
    }
    handleApproveModalPress();
  };

  return (
    <ScrollContainerUi>
      <SendConfirm
        isDetialsLoading={loadingDetails}
        isLoading={isTransactionCreting}
        ref={sendConfirm}
        onConfirm={sendHandler}
      >
        <SendDetails details={details} loading={loadingDetails} />
      </SendConfirm>
      <ScannerModalUi
        ref={scanAddress}
        onBarcodeScanner={(address) => {
          setAddress(address);
          scanAddress.current?.close();
        }}
      />

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
              onChangeText={(text) => setAmont(text)}
              onMaxPress={() => {
                setAmont(balance.toString());
              }}
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
