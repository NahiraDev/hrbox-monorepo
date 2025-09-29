import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enCommon } from '@core/translate/en/common';
import { faCommon } from '@core/translate/fa/common';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    fa: { common: faCommon },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
