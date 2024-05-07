import { I18n } from "i18n-js";
import React, { ReactNode, createContext, useContext, useState } from "react";

import translations from "@/translations";

type Locale = "en" | "ka";

const i18n = new I18n(translations);

type LanguageData = {
  locale: string;
  setLocale: (newLocale: Locale) => void;
  i18n: I18n;
};

const LanguageContext = createContext<LanguageData>({
  locale: "en",
  setLocale: () => {},
  i18n,
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");

  const updateLocale = (newLocale: Locale) => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: updateLocale, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
