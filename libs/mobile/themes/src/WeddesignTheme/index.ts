import {DefaultTheme} from 'styled-components';
import {Colors} from '@weddesign/enums';

const weddesignTheme: DefaultTheme = {
    colors: {
        primary: Colors.Pink,
        secondary: Colors.PinkDark,
        background: Colors.White,
        surface: Colors.PinkLighter,
        text: Colors.Black,
        onPrimary: Colors.White,
        onSecondary: Colors.Black,
    },
} as const;

export default weddesignTheme;
