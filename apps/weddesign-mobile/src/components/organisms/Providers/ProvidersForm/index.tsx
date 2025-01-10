import {useForm, Controller} from 'react-hook-form';
import {
    BackgroundEllipse,
    Button,
    CustomOverlay,
    CustomSwitch,
    Header,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes, ProvidersRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {CreateProviderDto, UpdateProviderDto} from '@shared/dto';
import {useKeyboardAdjustment} from '@weddesign/hooks';
import {useEffect} from 'react';

import {useRouting} from '../../../providers';
import {useCreateProvider} from '../../../../api/Providers/useCreateProvider';
import {useUpdateProvider} from '../../../../api/Providers/useUpdateProvider';

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
    const {mutate: createProvider, isLoading: isLoadingCreate} = useCreateProvider();
    const {mutate: updateProvider, isLoading: isLoadingUpdate} = useUpdateProvider();
    const keyboardOffset = useKeyboardAdjustment();

    const {category, provider} = router.location.state;

    const {control, handleSubmit, setValue} = useForm<CreateProviderDto>({
        defaultValues: {
            name: '',
            categoryId: category.id,
            description: '',
            amount: null,
            website: '',
            instagram: '',
            email: '',
            phoneNumber: '',
            stars: 1,
            isReserved: false,
        },
    });

    useEffect(() => {
        if (provider) {
            setValue('name', provider.name);
            setValue('categoryId', provider.categoryId);
            setValue('description', provider.description);
            setValue('amount', provider.amount);
            setValue('website', provider.website);
            setValue('instagram', provider.instagram);
            setValue('email', provider.email);
            setValue('phoneNumber', provider.phoneNumber);
            setValue('stars', provider.stars);
            setValue('isReserved', provider.isReserved);
        }
    }, [provider, setValue]);

    const handleSave = (data: CreateProviderDto | UpdateProviderDto) => {
        const handleSuccess = () => {
            console.log('Provider saved successfully!');
            router.navigate(ProvidersRoutes.LIST, category);
        };

        const handleError = () => {
            router.navigate(ErrorRoutes.GENERAL, 'providers');
        };

        if (provider) {
            updateProvider(
                {
                    id: provider.id,
                    updateProviderDto: data as UpdateProviderDto,
                },
                {onSuccess: handleSuccess, onError: handleError},
            );
        } else {
            createProvider(data as CreateProviderDto, {
                onSuccess: handleSuccess,
                onError: handleError,
            });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <BackgroundEllipse variant={'providers'} />
                <ProvidersFormWrapper>
                    <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        contentContainerStyle={{marginBottom: keyboardOffset}}
                    >
                        <ScrollView>
                            <FormInputWrapper>
                                <InputRow>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required:
                                                t('errors.name') ||
                                                'Name is required',
                                        }}
                                        render={({
                                            field: {onChange, value},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                <Input
                                                    value={value}
                                                    handleChange={onChange}
                                                    placeholder={t(
                                                        'providersForm.name',
                                                    )}
                                                    inputMode={'text'}
                                                    maxLength={22}
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
                                        render={({field: {onChange, value}}) => (
                                            <Input
                                                value={value}
                                                handleChange={onChange}
                                                placeholder={t(
                                                    'providersForm.description',
                                                )}
                                                inputMode={'text'}
                                                multiline={true}
                                                maxLength={200}
                                            />
                                        )}
                                    />
                                </InputRow>
                                <InputRow>
                                    <Controller
                                        name="amount"
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <Input
                                                value={value ? value.toString() : ''}
                                                handleChange={(newValue) =>
                                                    onChange(
                                                        newValue
                                                            ? parseFloat(newValue)
                                                            : null,
                                                    )
                                                }
                                                placeholder={t(
                                                    'providersForm.amount',
                                                )}
                                                inputMode={'numeric'}
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
                                                placeholder={t(
                                                    'providersForm.website',
                                                )}
                                                inputMode={'url'}
                                                maxLength={70}
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
                                                placeholder={t(
                                                    'providersForm.email',
                                                )}
                                                inputMode={'email'}
                                                maxLength={45}
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
                                                maxLength={15}
                                            />
                                        )}
                                    />
                                </InputRow>

                                <RatingRow>
                                    <Controller
                                        name="stars"
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <StarRating
                                                rating={value}
                                                onChange={onChange}
                                                color={Colors.Pink}
                                                starSize={50}
                                                enableSwiping={false}
                                                enableHalfStar={false}
                                            />
                                        )}
                                    />
                                </RatingRow>

                                <Row>
                                    <Controller
                                        name="isReserved"
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
                    </KeyboardAvoidingView>
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
