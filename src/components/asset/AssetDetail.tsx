import { Image } from "expo-image";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components/native";

import { AssetType } from "@/@types/assets";
import { UseBalances } from "@/app/api/balances";
import BodyTextUi from "@/components/ui/BodyTextUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import IconUi from "@/components/ui/IconUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { pixelToNumber } from "@/util/pixelToNumber";

const AssetDetails = ({ asset, slug }: { asset: AssetType; slug: string }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data: balances } = UseBalances(asset);
  const balance = balances?.balance;

  return (
    <>
      <ChainDetails>
        <Image
          source={asset?.icon}
          style={{
            width: pixelToNumber(theme.sizes["4xl"]),
            height: pixelToNumber(theme.sizes["4xl"]),
          }}
        />
      </ChainDetails>

      <SpacerUi size="xl">
        <HeaderTextUi weight="semi" size="lg" style={{ textAlign: "center" }}>
          {balance} {asset.symbol}
        </HeaderTextUi>
        <BodyTextUi weight="regular" size="md" style={{ textAlign: "center" }}>
          {/* {balance}$ */}
        </BodyTextUi>
      </SpacerUi>
      <SpacerUi size="3xl">
        <Actions>
          <ActionButton>
            <Link
              href={{
                pathname: `/(wallet)/home/send/${slug}`,
                params: {
                  balance,
                },
              }}
              asChild
            >
              <Button>
                <IconUi
                  library="Feather"
                  name="arrow-up-right"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>
            <BodyTextUi weight="bold">{t("shared.send")}</BodyTextUi>
          </ActionButton>
          <ActionButton>
            <Link href={`/(wallet)/home/recieve/${slug}`} asChild>
              <Button>
                <IconUi
                  library="Feather"
                  name="arrow-down-left"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>

            <BodyTextUi weight="bold">{t("shared.receive")}</BodyTextUi>
          </ActionButton>
          <ActionButton>
            <Link href={`/(wallet)/swap/${slug}`} asChild>
              <Button>
                <IconUi
                  library="AntDesign"
                  name="swap"
                  size="xl"
                  color="icon-second"
                />
              </Button>
            </Link>

            <BodyTextUi weight="bold">{t("shared.swap")}</BodyTextUi>
          </ActionButton>
        </Actions>
      </SpacerUi>
    </>
  );
};

const ChainDetails = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spaces["xl"]};
  justify-content: center;
  align-items: center;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["4xl"]};
`;

const ActionButton = styled.View`
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spaces["lg"]};
`;

const Button = styled.TouchableOpacity`
  width: ${({ theme }) => theme.sizes["4xl"]};
  height: ${({ theme }) => theme.sizes["4xl"]};
  background-color: ${({ theme }) => theme.colors["bg-second"]};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export default AssetDetails;
