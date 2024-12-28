import {DateType, ModeType} from 'react-native-ui-datepicker';
import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {Colors, LanguagesEnum} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

type CalendarProps = {
    mode?: ModeType;
    minDate?: DateType;
    maxDate?: DateType;
    date: DateType;
    onDateChange: (date: DateType) => void;
    locale?: LanguagesEnum;
};

const Calendar = ({
    mode = 'single',
    date,
    onDateChange,
    minDate,
    maxDate,
    locale = LanguagesEnum.en,
}: CalendarProps) => {
    return (
        <DatePicker
            date={date}
            mode={mode}
            onDateChange={onDateChange}
            onChange={(event) => onDateChange(event.date)}
            minDate={minDate ?? dayjs()}
            maxDate={maxDate ?? dayjs()}
            selectedItemColor={Colors.PinkDark}
            calendarTextStyle={{color: Colors.Black}}
            headerTextStyle={{color: Colors.Black}}
            buttonPrevIcon={<Text.Regular>{'\u25C0'}</Text.Regular>}
            buttonNextIcon={<Text.Regular>{'\u25B6'}</Text.Regular>}
            locale={locale}
            firstDayOfWeek={1}
        />
    );
};

export default Calendar;
