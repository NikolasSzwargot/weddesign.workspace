import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';

import enMainScreen from '../locales/en/mainScreen.json';
import enErrors from '../locales/en/errors.json';
import plMainScreen from '../locales/pl/mainScreen.json';
import plErrors from '../locales/pl/errors.json';

const resources = {
    en: {
        mainScreen: enMainScreen,
        errors: enErrors,
    },
    pl: {
        mainScreen: plMainScreen,
        errors: plErrors,
    },
};

const options: InitOptions = {
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    ns: ['mainScreen', 'errors'],
    defaultNS: 'mainScreen',
    interpolation: {
        escapeValue: false,
    },
    lng: 'en',
};

i18n.use(initReactI18next).init(options);

export default i18n;
