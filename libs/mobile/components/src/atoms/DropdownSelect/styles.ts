import {StyleSheet} from 'react-native';
import {Colors} from '@weddesign/enums';

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Colors.White,
        borderColor: Colors.Gray,
        borderRadius: 8,
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    dropdownContainer: {
        alignSelf: 'center',
        marginTop: 20,
        width: '90%',
    },
    dropdownListContainer: {
        backgroundColor: Colors.White,
        borderColor: Colors.Gray,
        borderRadius: 8,
        borderWidth: 1,
    },
    itemTextStyle: {
        color: Colors.Black,
        fontSize: 16,
    },
    placeholderStyle: {
        color: Colors.WhiteDark,
        fontSize: 16,
    },
    selectedTextStyle: {
        color: Colors.Black,
        fontSize: 16,
    },
});

export default styles;
