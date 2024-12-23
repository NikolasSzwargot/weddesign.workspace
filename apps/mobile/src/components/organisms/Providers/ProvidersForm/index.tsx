import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useRouting} from '@mobile/components';
import {
    BackgroundEllipse,
    Button,
    CustomOverlay,
    CustomSwitch,
    Header,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, ErrorRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';

// import {CreateGuestDto, UpdateGuestDto} from '@shared/dto'; @TODO: Użyć DTO do providerów

//@TODO: Użyć api od providerów
// import {useCreateGuest} from '../../../../api/Guests/useCreateGuest';
// import {useUpdateGuest} from '../../../../api/Guests/useUpdateGuest';

import StarRating from 'react-native-star-rating-widget';

import {
    Container,
    ErrorArea,
    FormInputWrapper,
    ProvidersFormWrapper,
    InputRow,
    Row,
    RatingRow,
    ButtonRow,
} from './styles';

const ProviderForm = () => {
    const {router} = useRouting();
    const {t} = useTranslation('providers');
    //@TODO: zamienić na endpointy providerów
    // const {mutate: createGuest, isLoading: isLoadingCreate} = useCreateGuest();
    // const {mutate: updateGuest, isLoading: isLoadingUpdate} = useUpdateGuest();
    const isLoadingCreate = false;
    const isLoadingUpdate = false;

    //@TODO: Zmienić any na DTO od tworzenia
    const {control, handleSubmit, setValue} = useForm<any>({
        defaultValues: {
            name: '',
            notes: '',
            offer: '',
            website: '',
            instagram: '',
            phoneNumber: '',
            rating: 4,
            reserved: false,
        },
    });

    const routerState = router.location.state;

    React.useEffect(() => {
        if (routerState) {
            //@TODO: Coś tu wymyślić, żeby tak nie było
            const provider = routerState.provider;
            const category = routerState.category;

            setValue('name', provider.name);
            setValue('notes', provider.notes);
            setValue('offer', provider.offer);
            setValue('website', provider.website);
            setValue('instagram', provider.instagram);
            setValue('phoneNumber', provider.phoneNumber);
            setValue('rating', provider.rating);
            setValue('reserved', provider.reserved);
        }
    }, [routerState, setValue]);

    //@TODO: zamienić any na CreateDTO | UpdateDTO`
    const handleSave = (data: any) => {
        const handleSuccess = () => {
            console.log('Provider saved successfully!');
            //@TODO: dodać powrót
            // router.navigate(ProvidersRoutes.LIST, category);
        };

        const handleError = () => {
            router.navigate(ErrorRoutes.GENERAL, 'providers');
        };

        //@TODO: odkomentować i dostosować do endpointów
        // if (provider) {
        //     updateProvider(
        //         {
        //             id: provider.id,
        //             updateProviderDto: data as UpdateProviderDto,
        //         },
        //         {onSuccess: handleSuccess, onError: handleError},
        //     );
        // } else {
        //     createProvider(data as CreateProviderDto, {
        //         onSuccess: handleSuccess,
        //         onError: handleError,
        //     });
        // }
        console.log(data);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <BackgroundEllipse variant={'providers'} />
                <ProvidersFormWrapper>
                    <Header />
                    <ScrollView>
                        <FormInputWrapper>
                            <InputRow>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required:
                                            t('errors.name') || 'Name is required',
                                    }}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <>
                                            <Input
                                                value={value}
                                                handleChange={onChange}
                                                placeholder={t('providersForm.name')}
                                                inputMode={'text'}
                                                maxLength={25}
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
                                            placeholder={t('providersForm.notes')}
                                            inputMode={'text'}
                                            multiline={true}
                                            maxLength={400}
                                        />
                                    )}
                                />
                            </InputRow>
                            <InputRow>
                                <Controller
                                    name="offer"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t('providersForm.offer')}
                                            inputMode={'text'}
                                            maxLength={10}
                                        />
                                    )}
                                />
                            </InputRow>
                            <InputRow>
                                <Controller
                                    name="website"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t('providersForm.website')}
                                            inputMode={'text'}
                                        />
                                    )}
                                />
                            </InputRow>
                            <InputRow>
                                <Controller
                                    name="instagram"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t(
                                                'providersForm.instagram',
                                            )}
                                            inputMode={'text'}
                                        />
                                    )}
                                />
                            </InputRow>

                            <InputRow>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t('providersForm.email')}
                                            inputMode={'email'}
                                        />
                                    )}
                                />
                            </InputRow>

                            <InputRow>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t(
                                                'providersForm.phoneNumber',
                                            )}
                                            inputMode={'tel'}
                                        />
                                    )}
                                />
                            </InputRow>

                            <RatingRow>
                                <Controller
                                    name="rating"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <StarRating
                                            rating={value}
                                            onChange={onChange}
                                            color={Colors.Pink}
                                            starSize={50}
                                        />
                                    )}
                                />
                            </RatingRow>

                            <Row>
                                <Controller
                                    name="reserved"
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <CustomSwitch
                                            value={value}
                                            onChange={() => onChange(!value)}
                                            onColor={Colors.LightPurple}
                                        />
                                    )}
                                />
                                <Text.Regular>
                                    {t('providersForm.reserved')}
                                </Text.Regular>
                            </Row>

                            <ButtonRow>
                                <Button onPress={handleSubmit(handleSave)}>
                                    {t('providersForm.save')}
                                </Button>
                            </ButtonRow>
                        </FormInputWrapper>
                    </ScrollView>
                </ProvidersFormWrapper>

                <CustomOverlay
                    isVisible={isLoadingCreate || isLoadingUpdate}
                    variant={'center'}
                >
                    <LoadingSpinner color={Colors.LightPurple} />
                </CustomOverlay>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default ProviderForm;
