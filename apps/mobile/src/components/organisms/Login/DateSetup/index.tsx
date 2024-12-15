import {Button, ProgressBar} from '@weddesign/components';
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

    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [showDateModal, setShowDateModal] = useState<boolean>(false);

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
                        <ProgressBar progress={100} />
                        <Images.Logo />
                    </ProgressLogoContainer>

                    <FormContainer>
                        <Text.Bold size={20}>{t('date.description')}</Text.Bold>

                        <Button
                            onPress={() => {
                                setShowDateModal(true);
                            }}
                        >
                            {weddingDate
                                ? weddingDate.toLocaleDateString()
                                : t('date.datePlaceholder')}
                        </Button>
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
                            disabled={!weddingDate}
                        >
                            {t('date.end')}
                        </Button>
                    </ButtonsContainer>
                </NextButtonContainer>
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
};

export default DateSetup;
