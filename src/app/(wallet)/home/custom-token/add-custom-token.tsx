import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { TokenpropertiesType } from "@/@types/assets";
import { useAddAssets, useAssets } from "@/app/api/assets";
import CustomTokenApprove from "@/components/customToken/CustomTokenApprove";
import CustomTokenFilters from "@/components/customToken/CustomTokenFilter";
import CustomTokenProps from "@/components/customToken/CustomTokenProps";
import ButtonUi from "@/components/ui/ButtonUi";
import { BodyUi, FooterUi, ScrollContainerUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import {
  generateEvmAsset,
  getTokenProperties,
  isValidERC20Addres,
} from "@/services/token.service";
import { Wallet } from "ethers";

export default function AddCustomToken() {
  const [loading, setLoading] = useState(false);

  const { mutate: addAsset } = useAddAssets();
  const [tokenProperties, setTokenProperties] = useState<
    TokenpropertiesType | undefined
  >();

  const { data: assetManager } = useAssets();
  const assets = assetManager?.assets;

  const { t } = useTranslation();

  const approveToken = useRef<BottomSheetModal>(null);

  const findCustomToken = async (address: string, network: Blockchain) => {
    if (!address || !network || !isValidERC20Addres(address)) {
      setTokenProperties(undefined);
      return;
    }

    try {
      setLoading(true);
      const properties = await getTokenProperties(address.trim(), network);
      const props = { ...properties, address, network };
      setTokenProperties(props);
    } catch {
      setTokenProperties(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveModalPress = () => {
    if (!tokenProperties) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.custom-token.add-custom-token.cant-find-error")
      );
      return;
    }

    approveToken.current?.present();
  };

  const importTokenHandler = async () => {
    if (!tokenProperties || !assets) return;

    const evmAsset = generateEvmAsset(tokenProperties, assets);

    if (!evmAsset) {
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.custom-token.add-custom-token.cant-generate-error")
      );
      return;
    }

    try {
      addAsset([evmAsset]);
      router.replace("/(wallet)/home");
      approveToken.current?.close();
    } catch (error) {
      console.log(error);
      Alert.alert(
        t("shared.error-label"),
        t("wallet.home.custom-token.add-custom-token.cant-add-addres")
      );
    }
  };

  return (
    <ScrollContainerUi>
      <CustomTokenApprove ref={approveToken} onApprove={importTokenHandler} />
      <BodyUi>
        <CustomTokenFilters onFilter={findCustomToken} />
        <SpacerUi size="3xl">
          <CustomTokenProps
            loading={loading}
            tokenProperties={tokenProperties}
          />
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <ButtonUi onPress={handleApproveModalPress}>
          {t("wallet.home.custom-token.add-custom-token.import-token-button")}
        </ButtonUi>
      </FooterUi>
    </ScrollContainerUi>
  );
}
