import dayjs from 'dayjs';
import {DateType} from 'react-native-ui-datepicker';

export const formatDate = (date: DateType, locale = 'en') => {
    const localizedDayjs = dayjs(date).locale(locale);
    return localizedDayjs.format('DD.MM.YYYY');
};
