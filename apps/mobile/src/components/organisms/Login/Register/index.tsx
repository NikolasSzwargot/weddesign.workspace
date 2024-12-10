import {useCallback, useState} from 'react';
import {Button, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {useRouting} from '@mobile/components';
import {Colors, LoginRoutes} from '@weddesign/enums';
import {isValidEmail, isValidPassword} from '@weddesign/utils';
import {TextInput} from 'react-native';

import {
    LabelContainer,
    NextButtonContainer,
    ProgressLogoContainer,
    styles,
} from '../styles';

import {InputGroup, Container, Description} from './styles';

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
            isValidPassword(password) &&
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
                <TextInput
                    value={password}
                    onChange={(e) => {
                        setPassword(e.nativeEvent.text);
                    }}
                    inputMode={'none'}
                    placeholder={t('register.password')}
                    placeholderTextColor={Colors.Gray}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    autoCorrect={false}
                    style={styles.textInput}
                />
                <TextInput
                    value={repeatedPassword}
                    onChange={(e) => {
                        setRepeatedPassword(e.nativeEvent.text);
                    }}
                    placeholder={t('register.repeatPassword')}
                    placeholderTextColor={Colors.Gray}
                    autoCapitalize={'none'}
                    secureTextEntry={true}
                    autoCorrect={false}
                    style={styles.textInput}
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
