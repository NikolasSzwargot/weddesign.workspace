import React from 'react';
import {RoutingProvider} from '@mobile/components';
import {ReactNode} from 'react';
import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {NativeRouter} from 'react-router-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {KeyboardProvider} from './KeyboardProvider';
import {UserProvider} from './UserProvider';

type CommonProvidersProps = {
    children: ReactNode;
};

const queryClient = new QueryClient();

export const CommonProviders = ({children}: CommonProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <NativeRouter>
                <RoutingProvider>
                    <ThemeProvider theme={weddesignTheme}>
                        <UserProvider>
                            <KeyboardProvider>
                                <WeddesignGlobalStyles>
                                    {children}
                                </WeddesignGlobalStyles>
                            </KeyboardProvider>
                        </UserProvider>
                    </ThemeProvider>
                </RoutingProvider>
            </NativeRouter>
        </QueryClientProvider>
    );
};
