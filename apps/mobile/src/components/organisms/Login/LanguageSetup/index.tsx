import React, {useEffect, useState} from 'react';
import {Button, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {DropdownSelect} from '@weddesign/components';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from 'i18next';
import {LanguagesEnum, LoginRoutes} from '@weddesign/enums';
import {useRouting} from '@mobile/components';

import {Container, NextButtonContainer, ProgressLogoContainer} from '../styles';

import {LanguageSelectContainer} from './styles';

const LanguageSetup = () => {
    const {t} = useTranslation('login');
    const {router} = useRouting();

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
                <ProgressBar progress={5} />
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
                <Button
                    onPress={() => {
                        router.navigate(LoginRoutes.REGISTER);
                    }}
                >
                    {t('next')}
                </Button>
            </NextButtonContainer>
        </Container>
    );
};

export default LanguageSetup;
