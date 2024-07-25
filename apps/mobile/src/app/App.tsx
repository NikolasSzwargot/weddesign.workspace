import React from 'react';
import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {HomePage} from '@mobile/components';
// import {WeddesignNavigator} from '@mobile/navigation';

export const App = () => {
    return (
        <ThemeProvider theme={weddesignTheme}>
            <WeddesignGlobalStyles>
                {/*<WeddesignNavigator />*/}
                <HomePage />
            </WeddesignGlobalStyles>
        </ThemeProvider>
    );
};
export default App;
