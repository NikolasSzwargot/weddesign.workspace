import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useRouting} from '@mobile/components';
import {
    Button,
    CustomSwitch,
    GuestListBackgroundEllipse,
    Header,
    Input,
} from '@weddesign/components';
import {Colors} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {CreateGuestDto} from '@shared/dto';

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

    // Get potential guest from the passed state
    const guest = router.query.queryParams?.guest;
    //
    // React.useEffect(() => {
    //     if (guest) {
    //         // Populate form if editing an existing guest
    //         setValue('firstName', guest.firstName);
    //         setValue('lastName', guest.lastName);
    //         setValue('notes', guest.notes);
    //         setValue('isChild', guest.isChild);
    //         setValue('needsAccommodation', guest.needsAccommodation);
    //         setValue('needsTransport', guest.needsTransport);
    //         setValue('hasSpecialDiet', guest.hasSpecialDiet);
    //     }
    // }, [guest, setValue]);

    const handleSave = (data: CreateGuestDto) => {
        console.log('Form submitted:', guest ? 'Edited guest' : 'New guest', data);
        // router.navigate(-1); // Navigate back after save
    };

    return (
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
                                    t('errors.lastName') || 'Last name is required',
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
                        <Text.Regular>{t('guestForm.accommodation')}</Text.Regular>
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
        </Container>
    );
};

export default GuestForm;
