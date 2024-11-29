import React from 'react';
import {RoutingProvider} from '@mobile/components';
import {ReactNode} from 'react';
import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {NativeRouter} from 'react-router-native';

type CommonProvidersProps = {
    children: ReactNode;
};

export const CommonProviders = ({children}: CommonProvidersProps) => {
    return (
        <NativeRouter>
            <RoutingProvider>
                <ThemeProvider theme={weddesignTheme}>
                    <WeddesignGlobalStyles>{children}</WeddesignGlobalStyles>
                </ThemeProvider>
            </RoutingProvider>
        </NativeRouter>
    );
};
