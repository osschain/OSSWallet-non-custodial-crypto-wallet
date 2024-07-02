import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { isAddress } from "ethers";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { AddresTypes } from "@/@types/balances";
import { useAssets } from "@/app/api/assets";
import NftTransferProperties, {
  NftTransferPropertiesType,
} from "@/components/nft/NftTransferProperties";
import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import ScannerModalUi from "@/components/ui/ScannerModalUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";
import { useAuth } from "@/providers/AuthProvider";
import { OSSblockchain } from "@/services/history.service";
import { getNftFee, transferNft } from "@/services/nft.service";
import { decrypt } from "@/util/es";

export default function TransferNft() {
  const { t } = useTranslation();
  const [properties, setProperties] =
    useState<NftTransferPropertiesType | null>(null);
  const [fee, setFee] = useState<string | null>(null);
  const { setupPass } = useAuth();

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isTranfering, setIsTranfering] = useState(false);

  const [address, setAddress] = useState("");
  const {
    slug: contractAddress,
    blockchain,
    tokenId,
    contractType,
    name,
  } = useLocalSearchParams();

  const { data: assetManager } = useAssets();

  const adresses = assetManager?.addresses;

  const fromAddress = useMemo(() => {
    return adresses?.find((adress) => adress.type === AddresTypes.evm)?.address;
  }, [adresses]);

  const scanAddress = useRef<BottomSheetModal>(null);
  const isCorrectAddress = isAddress(address);

  const setupDetails = useCallback(async () => {
    if (!contractAddress || !blockchain) {
      return;
    }

    setIsDetailsLoading(true);
    try {
      const fee = (await getNftFee({
        contractAddress: contractAddress as string,
        toAddress: address,
        fromAddress: fromAddress as string,
        blockchain: blockchain as OSSblockchain,
        tokenId: tokenId as string,
        tokenStandart: contractType as string,
      })) as unknown;

      setProperties({
        name: name as string,
        symbol: fee.native_currency,
        from: fromAddress,
        to: address,
        fee: fee.total_fee_native,
      });

      setFee(fee.total_fee_wei);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDetailsLoading(false);
    }
  }, [
    address,
    blockchain,
    contractAddress,
    contractType,
    fromAddress,
    name,
    tokenId,
  ]);

  const handleTransfer = async () => {
    try {
      setIsTranfering(true);
      const asset = assetManager?.getAsset(AddresTypes.evm);

      const decryptedPrivateKEy = await decrypt(
        asset.account.privateKey,
        setupPass as string
      );
      if (!decryptedPrivateKEy) throw new Error();

      const config = {
        fromAddress,
        toAddress: address,
        tokenId,
        blockchain,
        contractAddress,
        tokenStandart: contractType,
        privateKey: decryptedPrivateKEy,
        fee,
      };

      await transferNft(config);

      router.push("(wallet)/home");
    } catch (error) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.nft.transfer.transter-error")
      );
      console.log(error, "nft send error");
    } finally {
      setIsTranfering(false);
    }
  };

  useEffect(() => {
    if (isAddress(address)) {
      setupDetails();
    }
  }, [address, setupDetails]);

  //   if (isError) {
  //     return <AlertWithImageUI title={t("wallet.home.nft.slug.alert-error")} />;
  //   }

  return (
    <ScrollContainerUi>
      <BodyUi>
        <SpacerUi size="3xl">
          <BodyTextUi weight="semi" color="text-second">
            {t("wallet.home.nft.transfer.alert-text")}
          </BodyTextUi>
        </SpacerUi>
        <SpacerUi>
          <ScannerModalUi
            ref={scanAddress}
            onBarcodeScanner={(address) => {
              setAddress(address);
              scanAddress.current?.close();
            }}
          />
        </SpacerUi>
        <SpacerUi size="3xl">
          <HeaderTextUi>{t("shared.for-whom")}</HeaderTextUi>
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
                "wallet.home.nft.transfer.address-input-placeholder"
              )}
            />
          </SpacerUi>
        </SpacerUi>
        <SpacerUi size="xl" fullHeight>
          {isCorrectAddress && (
            <NftTransferProperties
              properties={properties}
              loading={isDetailsLoading}
            />
          )}
        </SpacerUi>
      </BodyUi>
      <FooterUi>
        <ButtonUi
          onPress={handleTransfer}
          disabled={!isCorrectAddress || !properties || isTranfering}
          isLoading={isTranfering}
          variant={isCorrectAddress && properties ? "primary" : "secondary"}
        >
          {t("shared.confirm")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}
