import {Keyboard, SectionList, TouchableWithoutFeedback} from 'react-native';
import {
    BackgroundEllipse,
    CustomSearchBar,
    CustomSectionHeader,
    Header,
    IconButton,
    LoadingSpinner,
    TaskItem,
} from '@weddesign/components';
import {Colors, HomeRoutes, TasksRoutes} from '@weddesign/enums';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {getDeadlineColor} from '@weddesign/utils';
import {TaskDto} from '@shared/dto';

import {useRouting} from '../../providers';
import {useDeleteTask, useGroupedTasks} from '../../../api';
import {WeddesignConfirmationModal} from '../../molecules';

import {Container, PageWrapper, TaskListWrapper, SearchBarWrapper} from './styles';

export const TasksList = () => {
    const {router} = useRouting();
    const {t} = useTranslation('tasks');
    const [searchQuery, setSearchQuery] = useState('');
    const {data: tasks, isLoading} = useGroupedTasks();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskDto>();
    const {mutateAsync: deleteMutation} = useDeleteTask();

    const onDeletePress = useCallback(
        (task: TaskDto) => {
            setSelectedTask(task);
            setIsModalVisible(!isModalVisible);
        },
        [isModalVisible],
    );

    const handleYes = useCallback(async () => {
        await deleteMutation({taskId: selectedTask.id});
        setIsModalVisible(false);
    }, [selectedTask]);

    return (
        <Container>
            <BackgroundEllipse variant={'tasks'} />
            <TaskListWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                {isLoading ? (
                    <LoadingSpinner color={Colors.DarkYellow} msg={t('loading')} />
                ) : (
                    <>
                        <TouchableWithoutFeedback
                            onPress={Keyboard.dismiss}
                            accessible={false}
                        >
                            <PageWrapper>
                                <SearchBarWrapper>
                                    <CustomSearchBar
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        placeholder={t('searchPlaceholder')}
                                    />
                                    <IconButton
                                        Icon={Icons.Filter}
                                        fillColor={Colors.WhiteSmokeDarker}
                                        onPress={() => console.log('clicked Filter')}
                                    />
                                    <IconButton
                                        Icon={Icons.Add}
                                        fillColor={Colors.StatusInvited}
                                        onPress={() =>
                                            router.navigate(TasksRoutes.ADD)
                                        }
                                    />
                                </SearchBarWrapper>
                            </PageWrapper>
                        </TouchableWithoutFeedback>
                        <SectionList
                            sections={tasks}
                            initialNumToRender={20}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <TaskItem
                                    task={item}
                                    onCheckboxPress={() => {}}
                                    onGuestPress={() => {}}
                                    onDeletePress={onDeletePress}
                                />
                            )}
                            renderSectionHeader={(item) => (
                                <CustomSectionHeader
                                    section={item.section}
                                    color={getDeadlineColor(
                                        item.section.data[0]?.deadline,
                                    )}
                                />
                            )}
                            showsVerticalScrollIndicator={true}
                        />

                        {isModalVisible && (
                            <WeddesignConfirmationModal
                                isVisible={isModalVisible}
                                onBackdropPress={() => setIsModalVisible(false)}
                                onYesPress={handleYes}
                                onNoPress={() => setIsModalVisible(false)}
                                message={t('deleteMessage', {
                                    name: selectedTask.name,
                                })}
                            />
                        )}
                    </>
                )}
            </TaskListWrapper>
        </Container>
    );
};
