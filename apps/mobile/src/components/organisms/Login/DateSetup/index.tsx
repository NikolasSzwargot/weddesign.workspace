import {Button, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {useRouting} from '@mobile/components';
import {AppRootRoutes, LoginRoutes} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';
import {Platform} from 'react-native';
import {useState} from 'react';

import {
    ButtonsContainer,
    NextButtonContainer,
    ProgressLogoContainer,
    StyledKeyboardAvoidingView,
    StyledScrollView,
} from '../styles';

import {FormContainer, Container} from './styles';

const DateSetup = () => {
    const {router} = useRouting();
    const {t} = useTranslation('login');
    const [brideName, setBrideName] = useState<string>('');

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
                        <Images.Logo />
                    </ProgressLogoContainer>

                    <FormContainer>
                        <Text.Bold size={20}>{t('names.description')}</Text.Bold>

                        <Input
                            value={brideName}
                            handleChange={(val) => {
                                setBrideName(val);
                            }}
                            placeholder={'Wybierz termin'}
                        />
                    </FormContainer>
                </Container>

                <NextButtonContainer style={{height: '15%'}}>
                    <ButtonsContainer>
                        <Button
                            onPress={() => {
                                router.navigate(LoginRoutes.NAMESSETUP);
                            }}
                            variant={'pink-out'}
                        >
                            {t('back')}
                        </Button>
                        <Button
                            onPress={() => {
                                router.navigate(AppRootRoutes.HOME);
                            }}
                        >
                            {t('next')}
                        </Button>
                    </ButtonsContainer>
                </NextButtonContainer>
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
};

export default DateSetup;
