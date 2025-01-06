import React from 'react';
import {StatusBar} from 'react-native';
import {CommonProviders, Routes} from '@weddesign-mobile/components';
import '../i18n';

export const App = () => {
    return (
        <CommonProviders>
            <StatusBar
                barStyle="dark-content"
                translucent={true}
                backgroundColor={'transparent'}
            />
            <Routes />
        </CommonProviders>
    );
};

export default App;
