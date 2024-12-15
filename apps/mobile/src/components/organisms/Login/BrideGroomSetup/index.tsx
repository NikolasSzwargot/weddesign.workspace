import {Button, Input, ProgressBar} from '@weddesign/components';
import {Images} from '@weddesign/assets';
import {useRouting} from '@mobile/components';
import {LoginRoutes} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';

import {
    ButtonsContainer,
    NextButtonContainer,
    ProgressLogoContainer,
} from '../styles';

import {FormContainer, Container} from './styles';

const BrideGroomSetup = () => {
    const {router} = useRouting();
    const {t} = useTranslation('login');

    return (
        <Container>
            <ProgressLogoContainer>
                <ProgressBar progress={68} />
                <Images.Logo />
            </ProgressLogoContainer>

            <FormContainer>
                <Text.Bold size={20}>
                    {'Cześć!\nNa początek daj nam się poznać :)\n' +
                        '\nJak powinniśmy się do Was zwracać? '}
                </Text.Bold>

                <Input
                    value={''}
                    handleChange={() => {}}
                    placeholder={'Imię przyszłego Pana Młodego'}
                />
                <Input
                    value={''}
                    handleChange={() => {}}
                    placeholder={'Imię przyszłej Pani Młodej'}
                />
            </FormContainer>

            <NextButtonContainer>
                <ButtonsContainer>
                    <Button
                        onPress={() => {
                            router.navigate(LoginRoutes.REGISTER);
                        }}
                        variant={'pink-out'}
                    >
                        {t('back')}
                    </Button>
                    <Button>{t('next')}</Button>
                </ButtonsContainer>
            </NextButtonContainer>
        </Container>
    );
};

export default BrideGroomSetup;
