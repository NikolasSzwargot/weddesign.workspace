import React from 'react';
import {BackgroundEllipse, Header} from '@weddesign/components';
import {useRouting} from '@mobile/components';
import {Images} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {HomeRoutes} from '@weddesign/enums';

import {Container, ContentWrapper, ErrorWrapper} from './styles';

const ErrorGeneral = () => {
    const {router} = useRouting();
    const variant = router.location.state || 'home';
    const {t} = useTranslation('errors');

    return (
        <Container>
            <BackgroundEllipse variant={variant} />
            <ErrorWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <ContentWrapper>
                    <Images.BrokenHeart />
                    <Text.Bold size={32}>{t('Error')}</Text.Bold>
                    <Text.SemiBold size={24}>{t('general')}</Text.SemiBold>
                </ContentWrapper>
            </ErrorWrapper>
        </Container>
    );
};

export default ErrorGeneral;
