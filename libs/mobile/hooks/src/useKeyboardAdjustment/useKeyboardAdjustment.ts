import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboardAdjustment = () => {
    const [keyboardOffset, setKeyboardOffset] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event) => {
                const keyboardHeight = event.endCoordinates.height;
                setKeyboardOffset(keyboardHeight);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOffset(0);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return keyboardOffset;
};
