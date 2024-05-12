import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
