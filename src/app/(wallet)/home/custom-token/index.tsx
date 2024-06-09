import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CustomTokenAssetList from "@/components/customToken/CustomTokenAssetList";
import ButtonUi from "@/components/ui/ButtonUi";
import IconUi from "@/components/ui/IconUi";
import { BodyUi, ContainerUi, FooterUi } from "@/components/ui/LayoutsUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { TextInputUi } from "@/components/ui/TextInputUi";

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  return (
    <ContainerUi>
      <BodyUi>
        <SpacerUi size="lg">
          <TextInputUi
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t(
              "wallet.home.custom-token.index.search-input-placeholder"
            )}
            left={
              <IconUi
                library="AntDesign"
                name="search1"
                size="xl"
                color="icon-second"
              />
            }
          />
        </SpacerUi>

        <SpacerUi size="xl" style={{ flex: 1 }}>
          <CustomTokenAssetList query={searchQuery} />
        </SpacerUi>
      </BodyUi>
      <FooterUi marginSize="sm">
        <Link href="/(wallet)/home/custom-token/add-custom-token" asChild>
          <ButtonUi
            icon={
              <IconUi
                library="Feather"
                name="plus"
                size="xl"
                color="icon-primary"
              />
            }
          >
            {t("wallet.home.custom-token.index.add-button-text")}
          </ButtonUi>
        </Link>
      </FooterUi>
    </ContainerUi>
  );
}

export default Index;
