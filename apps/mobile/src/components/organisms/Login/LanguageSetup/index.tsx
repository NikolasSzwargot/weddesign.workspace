import React, {useEffect, useState} from 'react';
import {Button, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {DropdownSelect} from '@weddesign/components';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from 'i18next';
import {LanguagesEnum} from '@weddesign/enums';

import {Container, NextButtonContainer, ProgressLogoContainer} from '../styles';

import {LanguageSelectContainer} from './styles';

const LanguageSetup = () => {
    const {t} = useTranslation('login');
    const dropdownData = Object.entries(LanguagesEnum).map(([value, label]) => ({
        value,
        label,
    }));

    const [language, setLanguage] = useState('pl');

    useEffect(() => {
        changeLanguage(language);
    }, [language]);

    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={1} />
                <Images.Logo />
            </ProgressLogoContainer>

            <LanguageSelectContainer>
                <Text.Bold size={20}>{t('language.choose')}</Text.Bold>
                <DropdownSelect
                    value={language}
                    onChange={setLanguage}
                    data={dropdownData}
                />
            </LanguageSelectContainer>

            <NextButtonContainer>
                <Button>{t('next')}</Button>
            </NextButtonContainer>
        </Container>
    );
};

export default LanguageSetup;
