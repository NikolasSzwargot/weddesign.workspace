import {WeddesignGlobalStyles, weddesignTheme} from '@weddesign/themes';
import {ThemeProvider} from 'styled-components/native';
import {HomePage} from '@mobile/components';
import {StatusBar} from 'react-native';

// import {WeddesignNavigator} from '@mobile/navigation';

export const App = () => {
    return (
        <ThemeProvider theme={weddesignTheme}>
            <WeddesignGlobalStyles>
                <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle={'dark-content'}
                />
                {/*<WeddesignNavigator />*/}
                <HomePage />
            </WeddesignGlobalStyles>
        </ThemeProvider>
    );
};
export default App;
