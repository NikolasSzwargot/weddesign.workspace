import {BackgroundEllipse, CustomSwitch, Header} from '@weddesign/components';
import React from 'react';
import {Colors, HomeRoutes, TasksRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';

import {useRouting, useTaskFilter} from '../../../providers';
import {TasksDeadlines} from '../../../molecules';
import {TasksFilterDateRange} from '../../../molecules';

import {
    Container,
    FormWrapper,
    IconWrapper,
    Row,
    TasksFilterWrapper,
    TitleWrapper,
} from './styles';

export const TasksFilter = () => {
    const {router} = useRouting();
    const {filter, setFilter} = useTaskFilter();
    const {t} = useTranslation('tasks');

    return (
        <Container>
            <BackgroundEllipse variant={'tasks'} />
            <TasksFilterWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <FormWrapper>
                    <TitleWrapper>
                        <Text.Bold style={{color: Colors.GrayFilter}} size={20}>
                            {t('filters.filtering')}
                        </Text.Bold>
                        <Text.Regular
                            style={{color: Colors.Pink}}
                            size={14}
                            onPress={() => setFilter({showDoneTasks: true})}
                        >
                            {t('filters.reset')}
                        </Text.Regular>
                    </TitleWrapper>
                    <IconWrapper>
                        <Icons.BlackX
                            onPress={() => router.navigate(TasksRoutes.LIST)}
                        />
                    </IconWrapper>
                    <Row>
                        <CustomSwitch
                            value={filter.showDoneTasks}
                            onChange={() =>
                                setFilter((current) => ({
                                    ...current,
                                    showDoneTasks: !current.showDoneTasks,
                                }))
                            }
                            onColor={Colors.DarkYellow}
                        />
                        <Text.Regular>{t('filters.showFinished')}</Text.Regular>
                    </Row>
                    <TasksDeadlines filter={filter} setFilter={setFilter} />
                    <TasksFilterDateRange />
                </FormWrapper>
            </TasksFilterWrapper>
        </Container>
    );
};
