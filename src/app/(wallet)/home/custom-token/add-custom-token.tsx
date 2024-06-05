import { Blockchain } from "@ankr.com/ankr.js";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert } from "react-native";
import styled from "styled-components/native";

import { AssetType, tokenType } from "@/@types/assets";
import { useAddAssets, useAssets } from "@/app/api/assets";
import { UseNetworks } from "@/app/api/network";
import NetworkOptions from "@/components/network/NetworkOptions";
import AlertWithImageUI from "@/components/ui/AlertWithImageUi";
import BodyTextUi from "@/components/ui/BodyTextUi";
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
import { TextAreaInputUi } from "@/components/ui/TextInputUi";
import {
  getTokenProperties,
  isValidERC20Addres,
} from "@/services/token.service";
import { defaultImage } from "@/util/DefaultImage";

export default function AddCustomToken() {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { mutate: addAsset } = useAddAssets();
  const [tokenProperties, setTokenProperties] = useState<tokenType | null>();
  const { data: assets } = useAssets();
  const { data: networks, isLoading, isError } = UseNetworks();
  const [network, setNetwork] = useState<Blockchain>("eth");

  const { t } = useTranslation();

  useEffect(() => {
    const bootstrapAsync = async () => {
      if (!address || !network || !isValidERC20Addres(address)) {
        setTokenProperties(null);
        return;
      }

      try {
        setLoading(true);
        const properties = await getTokenProperties(address.trim(), network);
        setTokenProperties(properties);
      } catch {
        setTokenProperties(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, network]);

  const snapPoints = useMemo(() => ["95%", "95%"], []);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const approveToken = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleApproveModalPress = () => {
    if (!tokenProperties) {
      Alert.alert("Can't find token");
      return;
    }

    approveToken.current?.present();
  };

  const scannerHandler = async (data: string) => {
    bottomSheetRef.current?.close();
    setAddress(data);
  };

  const importTokenHandler = async () => {
    if (!tokenProperties) return;
    const ethAccount = assets?.find((asset) => asset.blockchain === "eth");

    if (!ethAccount) return;

    const asset: AssetType = {
      id: address,
      icon: defaultImage,
      name: tokenProperties?.name,
      symbol: tokenProperties?.symbol,
      blockchain: network,
      account: ethAccount?.account,
      contractAddress: address,
      isShown: true,
      isNetwork: false,
    };

    try {
      addAsset([asset]);
      router.replace("/(wallet)/home");
      approveToken.current?.close();
    } catch (error) {
      console.log(error);
      Alert.alert("can't add Addres there is error");
    }
  };

  if (isError) {
    return (
      <ContainerUi>
        <SpacerUi size="4xl">
          <AlertWithImageUI title="Can't Display Networks" />
        </SpacerUi>
      </ContainerUi>
    );
  }

  if (isLoading) {
    return (
      <SpacerUi size="4xl">
        <ActivityIndicator />
      </SpacerUi>
    );
  }

  return (
    <ScrollContainerUi>
      <ScannerModalUi ref={bottomSheetRef} onBarcodeScanner={scannerHandler} />
      <BottomSheetModal index={0} snapPoints={snapPoints} ref={approveToken}>
        <ScrollContainerUi>
          <BodyUi>
            <SpacerUi size="xl">
              <HeaderTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-first")}
              </HeaderTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-second")}
              </BodyTextUi>
            </SpacerUi>
            <SpacerUi size="xl">
              <BodyTextUi>
                {t("wallet.home.custom-token.add-custom-token.warning-third")}
              </BodyTextUi>
            </SpacerUi>

            <SpacerUi size="xl">
              <BodyTextUi color="text-second">
                {t("wallet.home.custom-token.add-custom-token.warning-forth")}
              </BodyTextUi>
            </SpacerUi>
          </BodyUi>
          <FooterUi>
            <ButtonUi onPress={importTokenHandler}>
              {t("shared.import")}
            </ButtonUi>
            <SpacerUi size="xl">
              <ButtonUi
                variant="secondary"
                onPress={() => approveToken.current?.close()}
              >
                {t("shared.cancel")}
              </ButtonUi>
            </SpacerUi>
          </FooterUi>
        </ScrollContainerUi>
      </BottomSheetModal>
      <NetworkOptions
        networks={networks}
        onSelect={(selected) => {
          if (!selected) return;
          setNetwork(selected);
        }}
        required
      />
      <BodyUi>
        <SpacerUi size="2xl">
          <TextAreaInputUi
            placeholder="Enter Token Adress"
            value={address}
            onChangeText={(text) => setAddress(text)}
            multiline
            autoCapitalize="none"
            numberOfLines={5}
            right={
              <IconUi
                library="Ionicons"
                name="scan"
                size="2xl"
                color="icon-second"
                onPress={handlePresentModalPress}
              />
            }
          />
        </SpacerUi>
        {loading && (
          <SpacerUi size="4xl">
            <ActivityIndicator />
          </SpacerUi>
        )}

        {address && !tokenProperties && !loading && (
          <SpacerUi size="xl">
            <MessageUi>Can't find token</MessageUi>
          </SpacerUi>
        )}
        <SpacerUi size="3xl">
          {tokenProperties && (
            <TokenProperties>
              <TokenProperty label="Name:" value={tokenProperties.name} />
              <SpacerUi size="xl">
                <TokenProperty label="Symbol:" value={tokenProperties.symbol} />
              </SpacerUi>
              <SpacerUi size="xl">
                <TokenProperty
                  label="Decimals:"
                  value={tokenProperties.decimals.toString()}
                />
              </SpacerUi>
            </TokenProperties>
          )}
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

const TokenProperty = ({ label, value }: { label: string; value: string }) => (
  <Row>
    <LeftContent>
      <BodyTextUi weight="medium">{label}</BodyTextUi>
    </LeftContent>
    <RightContent>
      <BodyTextUi weight="medium" color="text-second">
        {value}
      </BodyTextUi>
    </RightContent>
  </Row>
);

const TokenProperties = styled.View`
  padding: ${({ theme }) => theme.spaces["xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: ${({ theme }) => theme.sizes["md"]};
`;

const LeftContent = styled.View``;

const RightContent = styled.View``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
