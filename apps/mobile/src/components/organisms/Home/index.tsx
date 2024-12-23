import React from 'react';
import {
    BackgroundEllipse,
    Header,
    RoundButton,
    TaskFrame,
} from '@weddesign/components';
import {Colors, GuestListRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {getDaysDifference} from '@weddesign/utils';
import {MockedUser} from '@mobile/mocks';

import {useRouting} from '../../providers';

import {ButtonRow, Container, HomeWrapper, MainFrame} from './styles';

const Home = () => {
    const {t} = useTranslation('home');
    const {router} = useRouting();

    const buttons = [
        {
            color: Colors.LightBlue,
            label: t('buttons.guests'),
            onPress: () => router.navigate(GuestListRoutes.LIST),
        },
        {
            color: Colors.LightGreen,
            label: t('buttons.budget'),
        },
        {color: Colors.LightPurple, label: t('buttons.subcontractors')},
        {color: Colors.Yellow, label: t('buttons.tasks')},
    ];

    return (
        <Container>
            <BackgroundEllipse variant={'home'} />
            <HomeWrapper>
                <Header />
                <MainFrame>
                    <Text.SemiBold size={20}>
                        {t('welcome', {
                            groomName: MockedUser.firstNameGroom,
                            brideName: MockedUser.firstNameBride,
                        })}
                    </Text.SemiBold>
                    <Text.SemiBold size={16}>
                        {t('counter', {
                            days: getDaysDifference(
                                new Date(),
                                new Date(MockedUser.weddingDate),
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
