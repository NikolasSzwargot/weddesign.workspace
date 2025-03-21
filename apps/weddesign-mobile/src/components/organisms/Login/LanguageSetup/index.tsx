import React, {useEffect} from 'react';
import {Button, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {DropdownSelect} from '@weddesign/components';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {LanguagesEnum, LoginRoutes} from '@weddesign/enums';
import {RegisterFormType, useRouting} from '@weddesign-mobile/components';
import {useFormContext} from 'react-hook-form';
import {changeLanguage} from 'i18next';

import {Container, NextButtonContainer, ProgressLogoContainer} from '../styles';

import {LanguageSelectContainer} from './styles';

const LanguageSetup = () => {
    const {t} = useTranslation('login');
    const {router} = useRouting();
    const {setValue, watch} = useFormContext<RegisterFormType>();

    const dropdownData = Object.entries(LanguagesEnum).map(([value, label]) => ({
        value,
        label,
    }));

    const language = watch('language', 'pl');

    useEffect(() => {
        if (language) {
            changeLanguage(language);
        }
    }, [language]);

    return (
        <>
            <Container>
                <ProgressLogoContainer>
                    <ProgressBar progress={30} />
                    <Images.Logo />
                </ProgressLogoContainer>

                <LanguageSelectContainer>
                    <Text.Bold size={20}>{t('language.choose')}</Text.Bold>
                    <DropdownSelect
                        value={language}
                        onChange={(value) => {
                            setValue('language', value);
                        }}
                        data={dropdownData}
                    />
                </LanguageSelectContainer>
            </Container>
            <NextButtonContainer>
                <Button
                    onPress={() => {
                        router.navigate(LoginRoutes.NAMESSETUP);
                    }}
                >
                    {t('next')}
                </Button>
            </NextButtonContainer>
        </>
    );
};

export default LanguageSetup;
