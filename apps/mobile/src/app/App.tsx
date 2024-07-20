import React from 'react';
import styled from 'styled-components/native';
import {View, Text, Button} from 'react-native';
import {useTranslation} from 'react-i18next';

import i18n from '../i18n';

const StyledText = styled.Text`
    color: aqua;
`;

export const App = () => {
    const {t} = useTranslation(['mainScreen', 'errors']);
    return (
        <View>
            <StyledText>{'styled text'}</StyledText>
            <Text>{t('mainScreen:Welcome')}</Text>
            <Text>{t('errors:Error1')}</Text>
            <Button title="en" onPress={() => i18n.changeLanguage('en')} />
            <Button title="pl" onPress={() => i18n.changeLanguage('pl')} />
        </View>
    );
};
export default App;
