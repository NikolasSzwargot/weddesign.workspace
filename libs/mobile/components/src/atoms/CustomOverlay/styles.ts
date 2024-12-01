import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    overlayStyle: {
        position: 'absolute',
        bottom: 0,
        zIndex: 9999,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomContentContainer: {
        justifyContent: 'flex-end',
    },
    centerContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'transparent',
    },
});
