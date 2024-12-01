import {useCallback, useState} from 'react';
import {Button, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {useRouting} from '@mobile/components';
import {LoginRoutes} from '@weddesign/enums';
import {isValidEmail} from '@weddesign/utils';

import {LabelContainer, NextButtonContainer, ProgressLogoContainer} from '../styles';

import {InputGroup} from './styles';
import {Container, Description} from './styles';

//@TODO: Implement registering through Google and Facebook
//@TODO: Make this fucking button not go up with keyboard
const Register = () => {
    //@TODO: Will useForm when other screens are completed
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const {t} = useTranslation('login');
    const {router} = useRouting();

    const isEgible = useCallback(() => {
        return (
            password.length >= 4 &&
            repeatedPassword === password &&
            isValidEmail(email)
        );
    }, [password, repeatedPassword, email]);

    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={30} />
                <LabelContainer>
                    <Images.Label />
                </LabelContainer>
            </ProgressLogoContainer>
            <Description>
                <Text.Bold size={18} style={{textAlign: 'center'}}>
                    {t('register.description')}
                </Text.Bold>
                <Text.Light size={14}>{t('register.hint')}</Text.Light>
            </Description>

            <InputGroup>
                <Input
                    value={email}
                    handleChange={setEmail}
                    inputMode={'email'}
                    placeholder={t('register.email')}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
                <Input
                    value={password}
                    handleChange={setPassword}
                    inputMode={'email'}
                    placeholder={t('register.password')}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    autoCorrect={false}
                />
                <Input
                    value={repeatedPassword}
                    handleChange={setRepeatedPassword}
                    inputMode={'email'}
                    placeholder={t('register.repeatPassword')}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    autoCorrect={false}
                />

                <Button variant={'secondary'} size={'medium'} disabled={!isEgible()}>
                    {t('register.registerNow')}
                </Button>
                <Button variant={'gray-out'} size={'medium'}>
                    {t('register.loginNow')}
                </Button>
            </InputGroup>

            <NextButtonContainer>
                <Button
                    onPress={() => {
                        router.navigate(LoginRoutes.LANGUAGE);
                    }}
                >
                    {t('back')}
                </Button>
            </NextButtonContainer>
        </Container>
    );
};

export default Register;
