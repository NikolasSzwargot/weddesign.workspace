import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';

//@TODO: These imports are pain in the ass. make module out of the locales so it will export one object
import enErrors from '../locales/en/errors.json';
import plErrors from '../locales/pl/errors.json';
import plHome from '../locales/pl/home.json';
import enHome from '../locales/en/home.json';
import enGuestList from '../locales/en/guestList.json';
import plGuestList from '../locales/pl/guestList.json';
import enShared from '../locales/en/shared.json';
import plShared from '../locales/pl/shared.json';
import enLogin from '../locales/en/login.json';
import plLogin from '../locales/pl/login.json';

const resources = {
    en: {
        errors: enErrors,
        home: enHome,
        guestList: enGuestList,
        shared: enShared,
        login: enLogin,
    },
    pl: {
        errors: plErrors,
        home: plHome,
        guestList: plGuestList,
        shared: plShared,
        login: plLogin,
    },
};

const options: InitOptions = {
    compatibilityJSON: 'v3',
    fallbackLng: 'pl',
    resources,
    ns: ['mainScreen', 'errors', 'guestList', 'shared'],
    defaultNS: 'mainScreen',
    interpolation: {
        escapeValue: false,
    },
    lng: 'pl',
};

i18n.use(initReactI18next).init(options);

export default i18n;
