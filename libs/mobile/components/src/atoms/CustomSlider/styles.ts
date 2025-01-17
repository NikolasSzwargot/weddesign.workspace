import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: 'gray',
    },
    track: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#F0F0F0',
    },
    thumb: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'black',
    },
});
