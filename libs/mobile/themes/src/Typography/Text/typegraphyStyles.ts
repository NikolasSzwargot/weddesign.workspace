import {StyleSheet} from 'react-native';
import {Colors} from '@weddesign/enums';

export const typographyStyles = StyleSheet.create({
    regular: {
        fontFamily: 'Inter-regular',
        fontWeight: 'normal',
    },
    bold: {
        fontFamily: 'Inter-Bold',
        fontWeight: 'bold',
    },
    semiBold: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
    },
    light: {
        fontFamily: 'Inter-Light',
        fontWeight: '300',
    },
    italic: {
        fontFamily: 'Inter-Italic',
        fontStyle: 'italic',
    },
    regularGray: {
        fontFamily: 'Inter-regular',
        fontWeight: 'normal',
        color: Colors.LightGray,
    },
});
