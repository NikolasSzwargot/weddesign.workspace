import {Controller, useForm} from 'react-hook-form';
import {useRouting} from '@weddesign-mobile/components';
import {
    BackgroundEllipse,
    Button,
    Calendar,
    CustomOverlay,
    CustomSwitch,
    Header,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes, TasksRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {CreateTaskDto, TaskDto, UpdateTaskDto} from '@shared/dto';
import {Keyboard, ScrollView, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';

import {useCreateTask, useUpdateTask} from '../../../../api';

import {
    Container,
    ErrorArea,
    FormInputWrapper,
    InputRow,
    Row,
    TaskFormWrapper,
} from './styles';

const MAX_YEARS_TASK = 5 as const;

export const TaskForm = () => {
    const {router} = useRouting();
    const {t} = useTranslation('tasks');
    const {mutate: createTask, isLoading: isLoadingCreate} = useCreateTask();
    const {mutate: updateTask, isLoading: isLoadingUpdate} = useUpdateTask();
    const {control, handleSubmit, setValue} = useForm<CreateTaskDto>({
        defaultValues: {
            name: '',
            description: '',
            deadline: new Date(),
        },
    });

    const task: TaskDto = router.location.state;

    const [isUnscheduled, setIsUnscheduled] = useState<boolean>(
        !(task && task?.deadline),
    );
    useEffect(() => {
        if (task) {
            setValue('name', task.name);
            setValue('deadline', task.deadline);
            setValue('description', task.description);
        }
    }, [task]);

    const handleSave = (data: CreateTaskDto | UpdateTaskDto) => {
        const handleSuccess = () => {
            router.navigate(TasksRoutes.LIST);
        };

        const handleError = () => {
            router.navigate(ErrorRoutes.GENERAL, 'tasks');
        };

        if (task) {
            const updatedTask = {
                ...data,
                deadline: isUnscheduled ? null : data.deadline,
            };

            updateTask(
                {
                    id: task.id,
                    data: updatedTask as UpdateTaskDto,
                },
                {onSuccess: handleSuccess, onError: handleError},
            );
        } else {
            const createdTask = {
                ...data,
                deadline: isUnscheduled ? null : data.deadline,
            };

            createTask(createdTask as CreateTaskDto, {
                onSuccess: handleSuccess,
                onError: handleError,
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <Container>
                    <BackgroundEllipse variant={'tasks'} />
                    <TaskFormWrapper>
                        <Header
                            onTitlePress={() => router.navigate(HomeRoutes.HOME)}
                        />
                        <FormInputWrapper>
                            <InputRow>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: t('errors.name'),
                                    }}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <>
                                            <Input
                                                value={value}
                                                handleChange={onChange}
                                                placeholder={t('form.name')}
                                                inputMode={'text'}
                                                maxLength={20}
                                            />
                                            <ErrorArea>
                                                {error && (
                                                    <Text.Error size={14}>
                                                        {error.message}
                                                    </Text.Error>
                                                )}
                                            </ErrorArea>
                                        </>
                                    )}
                                />
                            </InputRow>

                            <InputRow>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <>
                                            <Input
                                                value={value}
                                                handleChange={onChange}
                                                placeholder={t('form.description')}
                                                inputMode={'text'}
                                                maxLength={400}
                                                multiline={true}
                                                numberOfLines={10}
                                            />
                                            <ErrorArea>
                                                {error && (
                                                    <Text.Error size={14}>
                                                        {error.message}
                                                    </Text.Error>
                                                )}
                                            </ErrorArea>
                                        </>
                                    )}
                                />
                            </InputRow>
                            <Row>
                                <CustomSwitch
                                    value={isUnscheduled}
                                    onChange={() => setIsUnscheduled(!isUnscheduled)}
                                    onColor={Colors.DarkYellow}
                                />
                                <Text.Regular>
                                    {t('form.isUnscheduled')}
                                </Text.Regular>
                            </Row>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({
                                    field: {onChange, value},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <Calendar
                                            minDate={dayjs()}
                                            maxDate={dayjs().add(
                                                MAX_YEARS_TASK,
                                                'year',
                                            )}
                                            date={value}
                                            onDateChange={onChange}
                                            locale={'pl'}
                                            selectedItemColor={Colors.DarkYellow}
                                            disabled={isUnscheduled}
                                        />
                                        <ErrorArea>
                                            {error && (
                                                <Text.Error size={14}>
                                                    {error.message}
                                                </Text.Error>
                                            )}
                                        </ErrorArea>
                                    </>
                                )}
                            />

                            <Row>
                                <Button
                                    onPress={handleSubmit(handleSave)}
                                    style={{width: 170}}
                                    variant={'yellow'}
                                >
                                    {t('form.confirm')}
                                </Button>
                                <Button
                                    onPress={() => router.navigate(TasksRoutes.LIST)}
                                    variant={'yellow-out'}
                                    style={{width: 170}}
                                >
                                    {t('form.cancel')}
                                </Button>
                            </Row>
                        </FormInputWrapper>
                    </TaskFormWrapper>

                    <CustomOverlay
                        isVisible={isLoadingCreate || isLoadingUpdate}
                        variant={'center'}
                    >
                        <LoadingSpinner color={Colors.DarkYellow} />
                    </CustomOverlay>
                </Container>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};
