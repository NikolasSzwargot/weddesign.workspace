import React from 'react';
import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {HomePage} from '@mobile/components';
import {StatusBar} from 'react-native';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {LogBox} from 'react-native';
import {API_URL} from '@env';

//@NOTE: Ignoring that warning, irrevelant to our rc native version
LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components',
]);

export const App = () => {
    console.log(API_URL);
    return (
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
    );
};
export default App;
