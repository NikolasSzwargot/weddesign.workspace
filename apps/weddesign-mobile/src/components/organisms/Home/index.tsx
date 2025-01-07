import React from 'react';
import {
    BackgroundEllipse,
    Header,
    RoundButton,
    TaskFrame,
} from '@weddesign/components';
import {
    Colors,
    ExpenseListRoutes,
    GuestListRoutes,
    HomeRoutes,
    ProvidersRoutes,
} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {getDaysDifference} from '@weddesign/utils';

import {useRouting} from '../../providers';
import {useUser} from '../../providers/UserProvider';

import {ButtonRow, Container, HomeWrapper, MainFrame} from './styles';

const Home = () => {
    const {t} = useTranslation('home');
    const {router} = useRouting();
    const {user} = useUser();

    const buttons = [
        {
            color: Colors.LightBlue,
            label: t('buttons.guests'),
            onPress: () => router.navigate(GuestListRoutes.LIST),
        },
        {
            color: Colors.LightGreen,
            label: t('buttons.budget'),
            onPress: () => router.navigate(ExpenseListRoutes.LIST),
        },
        {
            color: Colors.LightPurple,
            label: t('buttons.providers'),
            onPress: () => router.navigate(ProvidersRoutes.GROUPED),
        },
        {color: Colors.StatusInvited, label: t('buttons.tasks')},
    ];

    return (
        <Container>
            <BackgroundEllipse variant={'home'} />
            <HomeWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <MainFrame>
                    <Text.SemiBold size={20}>
                        {t('welcome', {
                            groomName: user?.groomName,
                            brideName: user?.brideName,
                        })}
                    </Text.SemiBold>
                    <Text.SemiBold size={16}>
                        {t('counter', {
                            days: getDaysDifference(
                                new Date(),
                                new Date(user?.weddingDate),
                            ),
                        })}
                    </Text.SemiBold>
                    <TaskFrame />
                </MainFrame>
                <ButtonRow>
                    {buttons.map((buttonProps, index) => (
                        <RoundButton {...buttonProps} key={index} />
                    ))}
                </ButtonRow>
            </HomeWrapper>
        </Container>
    );
};

export default Home;
