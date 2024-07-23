import React from 'react';
import styled from 'styled-components/native';
import {View, Text, Button} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ThemeProvider} from 'styled-components';
import {weddesignTheme} from '@weddesign/themes';

import i18n from '../i18n';
import { WeddesignNavigator } from '../navigation';

const StyledText = styled.Text`
    color: aqua;
`;

export const App = () => {
    const {t} = useTranslation(['mainScreen', 'errors']);
    return (
        <ThemeProvider theme={weddesignTheme}>
            <WeddesignNavigator
        </ThemeProvider>
    );
};
export default App;
