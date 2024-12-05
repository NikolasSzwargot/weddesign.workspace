import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useRouting} from '@mobile/components';
import {
    Button,
    CustomOverlay,
    CustomSwitch,
    GuestListBackgroundEllipse,
    Header,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, GuestListRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {CreateGuestDto, UpdateGuestDto} from '@shared/dto';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

import {useCreateGuest} from '../../../../api/Guests/useCreateGuest';
import {useUpdateGuest} from '../../../../api/Guests/useUpdateGuest';

import {
    Container,
    ErrorArea,
    FormInputWrapper,
    GuestFormWrapper,
    InputRow,
    Row,
} from './styles';

const GuestForm = () => {
    const {router} = useRouting();
    const {t} = useTranslation('guestList');
    const {mutate: createGuest, isLoading: isLoadingCreate} = useCreateGuest();
    const {mutate: updateGuest, isLoading: isLoadingUpdate} = useUpdateGuest();
    const {control, handleSubmit, setValue} = useForm<CreateGuestDto>({
        defaultValues: {
            firstName: '',
            lastName: '',
            notes: '',
            isChild: false,
            overnight: false,
            canGetThere: false,
            isVege: false,
            isCompanion: false,
            guestStatusId: 1,
        },
    });

    const guest = router.location.state;
    React.useEffect(() => {
        if (guest) {
            setValue('firstName', guest.firstName);
            setValue('lastName', guest.lastName);
            setValue('notes', guest.notes);
            setValue('isChild', guest.isChild);
            setValue('overnight', guest.overnight);
            setValue('canGetThere', guest.canGetThere);
            setValue('isVege', guest.isVege);
        }
    }, [guest, setValue]);

    const handleSave = (data: CreateGuestDto | UpdateGuestDto) => {
        const handleSuccess = () => {
            console.log('Guest saved successfully!');
            router.navigate(GuestListRoutes.LIST);
        };

        const handleError = () => {
            console.log('Error saving guest!');
        };

        if (guest) {
            updateGuest(
                {
                    id: guest.id,
                    updateGuestDto: data as UpdateGuestDto,
                },
                {onSuccess: handleSuccess, onError: handleError},
            );
        } else {
            createGuest(data as CreateGuestDto, {
                onSuccess: handleSuccess,
                onError: handleError,
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <GuestListBackgroundEllipse />
                <GuestFormWrapper>
                    <Header />
                    <FormInputWrapper>
                        <InputRow>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{
                                    required:
                                        t('errors.firstName') ||
                                        'First name is required',
                                }}
                                render={({
                                    field: {onChange, value},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t('guestForm.firstName')}
                                            inputMode={'text'}
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
                                name="lastName"
                                control={control}
                                rules={{
                                    required:
                                        t('errors.lastName') ||
                                        'Last name is required',
                                }}
                                render={({
                                    field: {onChange, value},
                                    fieldState: {error},
                                }) => (
                                    <>
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t('guestForm.lastName')}
                                            inputMode={'text'}
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
                                name="notes"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <Input
                                        value={value}
                                        handleChange={onChange}
                                        placeholder={t('guestForm.notes')}
                                        inputMode={'text'}
                                        multiline={true}
                                    />
                                )}
                            />
                        </InputRow>

                        <Row>
                            <Controller
                                name="isChild"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <CustomSwitch
                                        value={value}
                                        onChange={() => onChange(!value)}
                                        onColor={Colors.LightBlue}
                                    />
                                )}
                            />
                            <Text.Regular>{t('guestForm.child')}</Text.Regular>
                        </Row>

                        <Row>
                            <Controller
                                name="overnight"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <CustomSwitch
                                        value={value}
                                        onChange={() => onChange(!value)}
                                        onColor={Colors.LightBlue}
                                    />
                                )}
                            />
                            <Text.Regular>
                                {t('guestForm.accommodation')}
                            </Text.Regular>
                        </Row>

                        <Row>
                            <Controller
                                name="canGetThere"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <CustomSwitch
                                        value={value}
                                        onChange={() => onChange(!value)}
                                        onColor={Colors.LightBlue}
                                    />
                                )}
                            />
                            <Text.Regular>{t('guestForm.transport')}</Text.Regular>
                        </Row>

                        <Row>
                            <Controller
                                name="isVege"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <CustomSwitch
                                        value={value}
                                        onChange={() => onChange(!value)}
                                        onColor={Colors.LightBlue}
                                    />
                                )}
                            />
                            <Text.Regular>{t('guestForm.vege')}</Text.Regular>
                        </Row>

                        <Button onPress={handleSubmit(handleSave)}>
                            {t('guestForm.save')}
                        </Button>
                    </FormInputWrapper>
                </GuestFormWrapper>

                <CustomOverlay
                    isVisible={isLoadingCreate || isLoadingUpdate}
                    variant={'center'}
                >
                    <LoadingSpinner color={Colors.LightBlue} />
                </CustomOverlay>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default GuestForm;
