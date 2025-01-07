import React, {useState} from 'react';
import {Button, Input, LoadingSpinner, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {Colors, LoginRoutes} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Platform, TextInput} from 'react-native';

import {useRouting} from '../../providers';
import {useUser} from '../../providers/UserProvider';

import {
    Container,
    ContentContainer,
    DescriptionContainer,
    FormContainer,
    LabelContainer,
    NextButtonContainer,
    ProgressLogoContainer,
    StyledKeyboardAvoidingView,
    StyledScrollView,
    styles,
} from './styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {t} = useTranslation('login');

    const {router} = useRouting();
    const {login} = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login({email: email, password: password});
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <StyledKeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StyledScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            >
                <Container>
                    <ProgressLogoContainer>
                        <ProgressBar progress={68} />
                        <LabelContainer>
                            <Images.Label />
                        </LabelContainer>
                    </ProgressLogoContainer>
                    <ContentContainer>
                        <DescriptionContainer>
                            <Text.Bold size={18}>
                                {t('loginScreen.welcome_back')}
                            </Text.Bold>
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
                            <TextInput
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.nativeEvent.text);
                                }}
                                placeholder={t('loginScreen.password_placeholder')}
                                placeholderTextColor={Colors.Gray}
                                autoCapitalize={'none'}
                                secureTextEntry={true}
                                autoCorrect={false}
                                style={styles.textInput}
                            />

                            {!isLoading ? (
                                <Button
                                    variant={'secondary'}
                                    size={'medium'}
                                    onPress={() => {
                                        handleLogin();
                                    }}
                                >
                                    {t('loginScreen.login_with_email')}
                                </Button>
                            ) : (
                                <LoadingSpinner />
                            )}
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
                    </ContentContainer>
                </Container>

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
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
};

export default Login;
