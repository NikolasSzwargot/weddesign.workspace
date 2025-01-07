import {DateType, ModeType} from 'react-native-ui-datepicker';
import DatePicker from 'react-native-ui-datepicker';
import {Colors} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

type CalendarProps = {
    mode?: ModeType;
    minDate: DateType;
    maxDate: DateType;
    date: DateType;
    onDateChange: (date: DateType) => void;
    locale?: string;
    selectedColor?: Colors;
};

const Calendar = ({
    mode = 'single',
    date,
    onDateChange,
    minDate,
    maxDate,
    locale = 'en',
    selectedColor = Colors.PinkDark,
}: CalendarProps) => {
    return (
        <DatePicker
            date={date}
            mode={mode}
            onChange={(event) => onDateChange(event.date)}
            minDate={minDate}
            maxDate={maxDate}
            selectedItemColor={selectedColor}
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
