import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import i18nTranslation from '../src/Utils/i18n.json'; // Chemin vers votre fichier de traductions

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          ...i18nTranslation, // Ajoutez d'autres traductions ici si nécessaire
        },
      },
    },
    lng: 'fr', // Langue par défaut
    interpolation: {
      escapeValue: false, // Ne pas échapper les variables d'interpolation
    },
  });

export default i18n;