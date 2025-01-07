import React from 'react';
import {CommonProviders, Routes} from '@weddesign-mobile/components';
import '../i18n';
import {LogBox} from 'react-native';

export const App = () => {
    LogBox.ignoreLogs(['TextElement:', 'Overlay:']);
    return (
        <CommonProviders>
            <Routes />
        </CommonProviders>
    );
};

export default App;
