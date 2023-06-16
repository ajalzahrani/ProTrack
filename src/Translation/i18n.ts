import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import locale from 'react-native-locale-detector';
// import i18nextReactNative from 'i18next-react-native-language-detector';
import {store} from '../store/Store';
import 'intl-pluralrules';

import en from './en.json';
import ar from './ar.json';

const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: () => {
    const savedDataJson = store.getString(STORAGE_KEY);
    const lng = savedDataJson ? savedDataJson : null;
    const selectLanguage = lng || locale;
    console.log('detect - selectLanguage:', selectLanguage);
    return selectLanguage;
  },
  cacheUserLanguage: () => {},
};

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources,

  // have a common namespace used around the full app
  // ns: ['common'],
  // defaultNS: 'common',

  // debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default
  },
});

export default i18n;
