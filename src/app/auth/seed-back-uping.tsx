import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import styled from "styled-components/native";

import BodyTextUi from "@/components/ui/BodyTextUi";
import ButtonUi from "@/components/ui/ButtonUi";
import HeaderTextUi from "@/components/ui/HeaderTextUi";
import SpacerUi from "@/components/ui/SpacerUi";
import { useAuth } from "@/providers/AuthProvider";
import { pixelToNumber } from "@/util/pixelToNumber";
import { useLanguage } from "@/providers/LanguageProvider";

function SeedBackUping() {
  const [seed, setSeed] = useState<string[] | null>(null);
  const { seed: mySeed } = useAuth();
  const { i18n } = useLanguage();
  useEffect(() => {
    if (mySeed) {
      setSeed(mySeed.trim().split(/\s+/));
    }
  }, [mySeed]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SpacerUi size="xl" />
      <Body>
        <Logo
          resizeMode="contain"
          source={require("@/assets/images/cpu.png")}
        />
        <SpacerUi size="3.5xl">
          <HeaderText adjustsFontSizeToFit size="2xl" weight="extra">
            {i18n.t("auth.seed-back-uping.header")}
          </HeaderText>
        </SpacerUi>
        <SpacerUi size="xl">
          <DescriptionText size="lg" color="text-second" weight="regular">
            {i18n.t("auth.seed-back-uping.description")}
          </DescriptionText>
        </SpacerUi>
        <SpacerUi size="2xl" />

        <SeedWrapper>
          {seed?.map((word, index) => {
            return (
              <Phrase size="lg" weight="medium" key={word}>
                <BodyTextUi color="text-second" size="lg" weight="medium">
                  {index + 1}.
                </BodyTextUi>
                {` ${word}`}
              </Phrase>
            );
          })}
        </SeedWrapper>
      </Body>

      <Footer>
        <Continue
          onPress={() => {
            router.push("/auth/seed-checking");
          }}
        >
          Continue
        </Continue>
      </Footer>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get("window").width;

const SeedWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces["2xl"]};
  flex-wrap: wrap;
`;

const Body = styled.View`
  flex: 1;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const HeaderText = styled(HeaderTextUi)`
  text-align: center;
`;

const Phrase = styled(BodyTextUi)`
  flex-basis: ${({ theme }) =>
    windowWidth / 2 - pixelToNumber(theme.spaces["xl"]) * 2 - 12}px;
  padding: 2px;
  border-color: ${({ theme }) => theme.colors["border-color"]};
  border-width: 1px;
  text-align: center;
  border-radius: ${({ theme }) => theme.spaces["lg"]};
`;

const DescriptionText = styled(BodyTextUi)`
  text-align: center;
`;

const Footer = styled.View`
  margin: ${({ theme }) => theme.spaces["4xl"]} 0;
  gap: ${({ theme }) => theme.spaces["xl"]};
`;

const SeedList = styled.FlatList``;

const Continue = styled(ButtonUi)``;

export default SeedBackUping;
