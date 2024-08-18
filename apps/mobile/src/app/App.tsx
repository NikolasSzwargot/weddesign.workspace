import React from 'react';
import {StatusBar} from 'react-native';
import {LogBox} from 'react-native';
import {CommonProviders} from '@mobile/components';
import {Routes} from '@mobile/components';

//@NOTE: Ignoring that warning, irrevelant to our rc native version
LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
]);

export const App = () => {
    return (
        <CommonProviders>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <Routes />
        </CommonProviders>
    );
};
export default App;
