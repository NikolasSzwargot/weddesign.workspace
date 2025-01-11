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
    selectedItemColor?: Colors;
    calendarTextColor?: Colors;
    disabled?: boolean;
};

const Calendar = ({
    mode = 'single',
    date,
    onDateChange,
    minDate,
    maxDate,
    locale = 'en',
    selectedItemColor = Colors.PinkDark,
    calendarTextColor = Colors.Black,
    disabled = false,
}: CalendarProps) => {
    return (
        <DatePicker
            date={date}
            mode={mode}
            onChange={(event) => {
                if (!disabled) {
                    onDateChange(event.date);
                }
            }}
            minDate={minDate}
            maxDate={maxDate}
            selectedItemColor={disabled ? Colors.Gray : selectedItemColor}
            calendarTextStyle={{color: disabled ? Colors.Gray : calendarTextColor}}
            headerTextStyle={{color: disabled ? Colors.Gray : Colors.Black}}
            buttonPrevIcon={<Text.Regular>{'\u25C0'}</Text.Regular>}
            buttonNextIcon={<Text.Regular>{'\u25B6'}</Text.Regular>}
            locale={locale}
            firstDayOfWeek={1}
        />
    );
};

export default Calendar;
