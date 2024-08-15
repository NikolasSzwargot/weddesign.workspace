import React from 'react';
import {RoundButton, BackgroundEllipse, TaskFrame} from '@weddesign/components';
import {Colors} from '@weddesign/enums';
import {Header} from '@weddesign/components';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {MockedUser} from '@mobile/mocks';

import {ButtonRow, Container, HomeWrapper, MainFrame} from './styles';
import {getDaysDifference} from '@weddesign/utils';

const Home = () => {
    const {t} = useTranslation('home');

    const buttons = [
        {color: Colors.LightBlue, label: t('buttons.guests')},
        {color: Colors.LightGreen, label: t('buttons.budget')},
        {color: Colors.LightPurple, label: t('buttons.subcontractors')},
        {color: Colors.Yellow, label: t('buttons.tasks')},
    ];

    return (
        <Container>
            <BackgroundEllipse />
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
