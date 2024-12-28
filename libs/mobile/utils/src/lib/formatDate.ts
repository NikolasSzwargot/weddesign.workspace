import dayjs from 'dayjs';
import {DateType} from 'react-native-ui-datepicker';
import {LanguagesEnum} from '@weddesign/enums';

export const formatDate = (date: DateType, locale: LanguagesEnum = 'en') => {
    const localizedDayjs = dayjs(date).locale(locale);
    return localizedDayjs.format('DD.MM.YYYY');
};
