import {BackgroundEllipse, CustomSwitch, Header} from '@weddesign/components';
import React, {useState} from 'react';
import {Colors, HomeRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

import {useRouting} from '../../../providers';

import {
    Container,
    FormWrapper,
    Row,
    TasksFilterWrapper,
    TitleWrapper,
} from './styles';

export const TasksFilter = () => {
    const {router} = useRouting();
    const [showFinished, setShowFinished] = useState(false);

    return (
        <Container>
            <BackgroundEllipse variant={'tasks'} />
            <TasksFilterWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <FormWrapper>
                    <TitleWrapper>
                        <Text.Bold style={{color: Colors.GrayFilter}} size={20}>
                            {'Filtrowanie'}
                        </Text.Bold>
                        <Text.Regular style={{color: Colors.Pink}} size={14}>
                            {'Restartuj wszystkie'}
                        </Text.Regular>
                    </TitleWrapper>
                    <Row>
                        <CustomSwitch
                            value={showFinished}
                            onChange={() => setShowFinished(!showFinished)}
                            onColor={Colors.DarkYellow}
                        />
                        <Text.Regular>{'Pokaż ukończone zadania'}</Text.Regular>
                    </Row>
                </FormWrapper>
            </TasksFilterWrapper>
        </Container>
    );
};
