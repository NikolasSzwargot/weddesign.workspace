import React, {createContext, useContext, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

type KeyboardContextType = {
    visible: boolean;
};

const KeyboardContext = createContext<KeyboardContextType>({
    visible: false,
});

// Provider
export const KeyboardProvider = ({children}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
            setVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
            setVisible(false),
        );

        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    return (
        <KeyboardContext.Provider value={{visible}}>
            {children}
        </KeyboardContext.Provider>
    );
};

export const useKeyboard = () => useContext(KeyboardContext);
