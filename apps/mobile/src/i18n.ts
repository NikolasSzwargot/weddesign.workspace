import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';

//@TODO: These imports are pain in the ass. make module out of the locales so it will export one object
import enErrors from '../locales/en/errors.json';
import plErrors from '../locales/pl/errors.json';
import plHome from '../locales/pl/home.json';
import enHome from '../locales/en/home.json';
import plBudget from '../locales/pl/budget.json';
import enBudget from '../locales/en/budget.json';

const resources = {
    en: {
        errors: enErrors,
        home: enHome,
        budget: enBudget,
    },
    pl: {
        errors: plErrors,
        home: plHome,
        budget: plBudget,
    },
};

const options: InitOptions = {
    compatibilityJSON: 'v3',
    fallbackLng: 'pl',
    resources,
    ns: ['mainScreen', 'errors', 'budget'],
    defaultNS: 'mainScreen',
    interpolation: {
        escapeValue: false,
    },
    lng: 'pl',
};

i18n.use(initReactI18next).init(options);

export default i18n;
