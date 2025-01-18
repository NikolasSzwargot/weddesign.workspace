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
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {getDeadlineColor} from '@weddesign/utils';
import {TaskDto, UpdateTaskDto} from '@shared/dto';
import {searchByQuery} from '@weddesign-mobile/utils';

import {useRouting, useTasks} from '../../providers';
import {useDeleteTask, useUpdateTask} from '../../../api';
import {WeddesignConfirmationModal} from '../../molecules';

import {Container, PageWrapper, TaskListWrapper, SearchBarWrapper} from './styles';

export const TasksList = () => {
    const {router} = useRouting();
    const {t} = useTranslation('tasks');
    const [searchQuery, setSearchQuery] = useState('');
    const [listData, setListData] = useState([]);
    const {tasks, isLoading, filterTasks} = useTasks();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskDto>();
    const {mutateAsync: deleteMutation} = useDeleteTask();
    const {mutate: updateMutation} = useUpdateTask();

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

    const handleCheckbox = (task: TaskDto) => {
        const updatedTask = {
            isDone: !task.isDone,
            name: task.name,
            description: task.description,
            deadline: task.deadline,
        } as UpdateTaskDto;
        updateMutation({id: task.id, data: updatedTask});
    };

    useEffect(() => {
        if (!isLoading) {
            setListData(searchByQuery(tasks, searchQuery));
        }
    }, [searchQuery, isLoading, tasks]);

    return (
        <Container>
            <BackgroundEllipse variant={'tasks'} />
            <TaskListWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                {isLoading ? (
                    <LoadingSpinner color={Colors.DarkYellow} msg={t('loading')} />
                ) : (
                    tasks && (
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
                                            onPress={() => {
                                                router.navigate(TasksRoutes.FILTER);
                                            }}
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
                                sections={listData}
                                initialNumToRender={20}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <TaskItem
                                        task={item}
                                        onCheckboxPress={handleCheckbox}
                                        onGuestPress={() => {
                                            router.navigate(TasksRoutes.ADD, item);
                                        }}
                                        onDeletePress={onDeletePress}
                                    />
                                )}
                                renderSectionHeader={(item) => (
                                    <CustomSectionHeader
                                        section={
                                            item.section.data[0]?.deadline
                                                ? item.section
                                                : {title: t('unscheduled')}
                                        }
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
                    )
                )}
            </TaskListWrapper>
        </Container>
    );
};
