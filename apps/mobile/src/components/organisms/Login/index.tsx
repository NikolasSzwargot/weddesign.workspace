import React, {useState} from 'react';
import {Button, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {LoginRoutes} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';

import {useRouting} from '../../providers';
import {useLogin} from '../../../api/Login/useLogin';

import {
    ContentComtainer,
    DescriptionContainer,
    FormContainer,
    LabelContainer,
    LoginContainer,
    NextButtonContainer,
    ProgressLogoContainer,
} from './styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation('login');

    const {mutate} = useLogin();
    const {router} = useRouting();

    return (
        <LoginContainer behavior={'padding'}>
            <ProgressLogoContainer>
                <ProgressBar progress={68} />
                <LabelContainer>
                    <Images.Label />
                </LabelContainer>
            </ProgressLogoContainer>
            <ContentComtainer>
                <DescriptionContainer>
                    <Text.Bold size={18}>{t('loginScreen.welcome_back')}</Text.Bold>
                    <Text.Regular size={14}>
                        {t('loginScreen.enter_email')}
                    </Text.Regular>
                </DescriptionContainer>
                <FormContainer>
                    <Input
                        handleChange={(val) => setEmail(val)}
                        value={email}
                        placeholder={t('loginScreen.email_placeholder')}
                    />
                    <Input
                        handleChange={(val) => setPassword(val)}
                        value={password}
                        placeholder={t('loginScreen.password_placeholder')}
                    />

                    <Button
                        variant={'secondary'}
                        size={'medium'}
                        onPress={() => {
                            mutate({email: email, password: password});
                        }}
                    >
                        {t('loginScreen.login_with_email')}
                    </Button>
                    <Button
                        variant={'gray-out'}
                        size={'medium'}
                        onPress={() => {
                            router.navigate(LoginRoutes.REGISTER);
                        }}
                    >
                        {t('loginScreen.no_account_register')}
                    </Button>
                </FormContainer>
            </ContentComtainer>

            <NextButtonContainer>
                <Button
                    onPress={() => {
                        router.navigate(LoginRoutes.LANGUAGE);
                    }}
                    variant={'pink-out'}
                >
                    {t('back')}
                </Button>
            </NextButtonContainer>
        </LoginContainer>
    );
};

export default Login;
