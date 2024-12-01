import React, {createContext, useContext, useEffect, useState} from 'react';
import {EmitterSubscription, Keyboard} from 'react-native';

type KeyboardContextType = {
    visible: boolean;
};

const KeyboardContext = createContext<KeyboardContextType>({
    visible: false,
});

// Provider
export const KeyboardProvider: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
            setVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
            setVisible(false),
        );

        return () => {
            Keyboard.removeAllListeners(EmitterSubscription);
        };
    }, []);

    return (
        <KeyboardContext.Provider value={{visible}}>
            {children}
        </KeyboardContext.Provider>
    );
};

export const useKeyboard = () => useContext(KeyboardContext);
