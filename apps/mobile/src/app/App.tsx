import React from 'react';
import {StatusBar} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {LogBox} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LogBox} from 'react-native';
import {CommonProviders} from '@mobile/components';
import {Routes} from '@mobile/components';

//@NOTE: Ignoring that warning, irrevelant to our rc native version
LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
]);

const queryClient = new QueryClient();

export const App = () => {
    return (
        <CommonProviders>
          <QueryClientProvider client={queryClient}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <Routes />
          </QueryClientProvider>
        </CommonProviders>
    );
};
export default App;
