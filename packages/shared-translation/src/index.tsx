import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import { faCommon } from "./fa/common.js";
// import { enCommon } from "./en/common.js";
//
interface ProjectResources {
  en?: Record<string, any>;
  fa?: Record<string, any>;
}

const initI18n = (projectResources: ProjectResources = { en: {}, fa: {} }) => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        common: {},
        ...projectResources.en,
      },
      fa: {
        common: {},
        ...projectResources.fa,
      },
    },
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
  return i18n;
};

export {i18n}

initI18n({ en: {}, fa: {} });
