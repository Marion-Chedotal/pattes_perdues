import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import i18nTranslation from '../src/utils/i18n.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          ...i18nTranslation, 
        },
      },
    },
    lng: 'fr', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;