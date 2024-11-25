import React from 'react';
import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {HomePage} from '@mobile/components';
import {StatusBar} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {LogBox} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

//@NOTE: Ignoring that warning, irrevelant to our rc native version
import GuestListPage from '../components/pages/GuestListPage';

//@NOTE: Ignoring that warning, irrevelant to our rc native version
LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
]);

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={weddesignTheme}>
                <WeddesignGlobalStyles>
                    <StatusBar
                        translucent={true}
                        backgroundColor={'transparent'}
                        barStyle={'dark-content'}
                    />
                    <NativeRouter>
                        <Routes>
                            <Route path={'/'} element={<HomePage />} />
                        </Routes>
                    </NativeRouter>
                </WeddesignGlobalStyles>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
export default App;
