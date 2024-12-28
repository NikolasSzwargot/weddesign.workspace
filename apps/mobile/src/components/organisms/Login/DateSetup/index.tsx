import {Button, Calendar, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {useRouting} from '@mobile/components';
import {AppRootRoutes, LoginRoutes} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';
import {Platform} from 'react-native';
import {useState} from 'react';
import dayjs from 'dayjs';
import {DateType} from 'react-native-ui-datepicker';
import {formatDate} from '@weddesign/utils';

import {
    ButtonsContainer,
    NextButtonContainer,
    ProgressLogoContainer,
    StyledKeyboardAvoidingView,
    StyledScrollView,
} from '../styles';

import {FormContainer, Container} from './styles';

//@NOTE: Needed attribute: 5 Years max
const MAX_YEARS_TO_WEDDING = 5;

const DateSetup = () => {
    const {router} = useRouting();
    const {t, i18n} = useTranslation('login');

    const [weddingDate, setWeddingDate] = useState<DateType>(dayjs());
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
                        {showDateModal ? (
                            <Calendar
                                mode={'single'}
                                onDateChange={(date) => {
                                    setWeddingDate(date);
                                }}
                                date={weddingDate}
                                minDate={dayjs()}
                                maxDate={dayjs().add(MAX_YEARS_TO_WEDDING, 'years')}
                                locale={i18n.language}
                            />
                        ) : (
                            <>
                                <Text.Bold size={20}>
                                    {t('date.description')}
                                </Text.Bold>

                                <Input
                                    onPress={() => {
                                        setShowDateModal(true);
                                    }}
                                    placeholder={formatDate(
                                        weddingDate,
                                        i18n.language,
                                    )}
                                    handleChange={(_) => {}}
                                    inputMode={'none'}
                                    style={{textAlign: 'center'}}
                                />
                            </>
                        )}
                    </FormContainer>
                </Container>

                <NextButtonContainer
                    style={showDateModal ? {height: '10%'} : {height: '15%'}}
                >
                    <ButtonsContainer>
                        {!showDateModal && (
                            <Button
                                onPress={() => {
                                    router.navigate(LoginRoutes.NAMESSETUP);
                                }}
                                variant={'pink-out'}
                            >
                                {t('back')}
                            </Button>
                        )}
                        <Button
                            onPress={() => {
                                if (!showDateModal) {
                                    router.navigate(AppRootRoutes.HOME);
                                } else {
                                    setShowDateModal(false);
                                }
                            }}
                            disabled={!weddingDate}
                        >
                            {showDateModal ? t('date.submitDate') : t('date.end')}
                        </Button>
                    </ButtonsContainer>
                </NextButtonContainer>
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
};

export default DateSetup;
