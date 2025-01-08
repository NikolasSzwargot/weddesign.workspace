import React, {useState} from 'react';
import {useQueryClient} from 'react-query';
import {useTranslation} from 'react-i18next';
// import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
    BackgroundEllipse,
    BudgetFrame,
    BudgetStatusBar,
    Button,
    Calendar,
    CustomOverlay,
    CustomSwitch,
    Header,
    IconDot,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, ExpenseListRoutes, HomeRoutes} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {Text} from '@weddesign/themes';
import {useRouting} from '@weddesign-mobile/components';
import {Controller, useForm} from 'react-hook-form';
import {CreateExpenseDto, UpdateExpenseDto} from '@shared/dto';
import dayjs from 'dayjs';
import {formatDate, getBudgetCategoryData} from '@weddesign-mobile/utils';
import {FlatList} from 'react-native';

import {useMainLimit} from '../../../../api/Budget/useMainLimit';
import {useCreateExpense} from '../../../../api/Budget/useCreateExpense';
import {useUpdateExpense} from '../../../../api/Budget/useUpdateExpense';
import {useCategoriesData} from '../../../../api/Budget/useCategoriesData';

import {
    BudgetMainFrame,
    BudgetMainWrapper,
    CategoryContainer,
    CategorypickerContainer,
    CategorypickerItem,
    Container,
    DatepickerContainer,
    DatepickerOpenBox,
    FormInputWrapper,
    InputRow,
    Row,
} from './styles';

//@NOTE: Needed attribute: 5 Years max
const MAX_YEARS_FORWARD = 5;

const ExpenseForm = () => {
    const {router} = useRouting();
    const {t, i18n} = useTranslation('budget');
    const queryClient = useQueryClient();
    const [isDatepickerVisible, setDatepickerVisible] = useState(false);
    const [isCategoryPickVisible, setCategoryPickVisible] = useState(false);
    const {mutate: createExpense, isLoading: isLoadingCreate} = useCreateExpense();
    const {mutate: updateExpense, isLoading: isUpdating} = useUpdateExpense();
    const {control, handleSubmit, setValue} = useForm<CreateExpenseDto>({
        defaultValues: {
            amount: 0,
            name: '',
            description: '',
            categoryId: 16,
            isPaid: false,
            deadline: new Date(Date.now()),
        },
    });

    const expense = router.location.state;
    React.useEffect(() => {
        if (expense) {
            setValue('amount', expense.amount);
            setValue('name', expense.name);
            setValue('description', expense.description);
            setValue('categoryId', expense.categoryId);
            setValue('isPaid', expense.isPaid);
            setValue('deadline', new Date(expense.deadline));
        }
    }, [expense, setValue]);

    const {
        data: catsData,
        isLoading: isLoadingCats,
        isError: isErrorCats,
        isFetching: isFetchingCats,
    } = useCategoriesData();

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
        isFetching: isFetchingMainLimit,
    } = useMainLimit();

    const handleSave = (data: CreateExpenseDto | UpdateExpenseDto) => {
        const handleSuccess = () => {
            console.log('Guest saved successfully!');
            router.navigate(ExpenseListRoutes.LIST);
        };

        const handleError = () => {
            console.log('Error saving guest!');
        };

        if (expense) {
            updateExpense(
                {
                    id: expense.id,
                    updateExpenseDto: data as UpdateExpenseDto,
                },
                {onSuccess: handleSuccess, onError: handleError},
            );
        } else {
            createExpense(data as CreateExpenseDto, {
                onSuccess: handleSuccess,
                onError: handleError,
            });
        }
    };

    const handleCancel = () => {
        setDatepickerVisible(false);
        setCategoryPickVisible(false);
    };

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            <BudgetMainWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                {isLoadingMainLimit ? (
                    <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
                ) : (
                    <>
                        <BudgetMainFrame>
                            <BudgetFrame
                                current={mainLimitData.totalPlanned}
                                total={mainLimitData.limit}
                                currency={t('currency')}
                            />
                            <BudgetStatusBar
                                limit={mainLimitData.limit}
                                notPaid={mainLimitData.notPaid}
                                paid={mainLimitData.paid}
                                totalPlanned={mainLimitData.totalPlanned}
                            />
                        </BudgetMainFrame>
                        <FormInputWrapper>
                            <InputRow>
                                <Row>
                                    <CategoryContainer
                                        onPress={() => setCategoryPickVisible(true)}
                                    >
                                        {(() => {
                                            const data = getBudgetCategoryData(
                                                control._formValues.categoryId,
                                            );
                                            return (
                                                <IconDot
                                                    color={data.color}
                                                    Icon={data.icon}
                                                />
                                            );
                                        })()}
                                        <Icons.ArrowRight
                                            width={20}
                                            height={20}
                                            rotation={90}
                                        />
                                    </CategoryContainer>

                                    <Controller
                                        control={control}
                                        name={'amount'}
                                        render={({
                                            field: {onChange, value},
                                            fieldState: {error},
                                        }) => (
                                            <Input
                                                style={{maxWidth: '75%'}}
                                                value={value.toString()}
                                                handleChange={(text) => {
                                                    onChange(Number(text) || 0);
                                                }}
                                                placeholder={`0${t('currency')}`}
                                                inputMode={'decimal'}
                                                multiline={false}
                                                maxLength={9}
                                            />
                                        )}
                                    />
                                </Row>
                            </InputRow>
                            <InputRow>
                                <Controller
                                    control={control}
                                    name={'name'}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={`nazwa`}
                                            inputMode={'text'}
                                            maxLength={30}
                                        />
                                    )}
                                />
                            </InputRow>
                            <InputRow>
                                <Controller
                                    control={control}
                                    name={'description'}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={`opis`}
                                            inputMode={'text'}
                                            multiline={true}
                                            maxLength={400}
                                        />
                                    )}
                                />
                            </InputRow>
                            <InputRow>
                                <Row>
                                    <Controller
                                        name="isPaid"
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <CustomSwitch
                                                value={value}
                                                onChange={() => onChange(!value)}
                                                onColor={Colors.LightGreen}
                                            />
                                        )}
                                    />
                                    <Text.SemiBold>
                                        {/*@TODO - tlumaczenie*/}
                                        {t('budgetForm.isPaind')}
                                    </Text.SemiBold>
                                </Row>
                            </InputRow>
                            <InputRow>
                                <Row>
                                    <Text.SemiBold>
                                        {t('budgetForm.deadline')}
                                    </Text.SemiBold>
                                    <DatepickerOpenBox
                                        onPress={() => setDatepickerVisible(true)}
                                    >
                                        <Text.SemiBold>
                                            {formatDate(
                                                control._formValues.deadline,
                                                i18n.language,
                                            )}
                                        </Text.SemiBold>
                                    </DatepickerOpenBox>
                                </Row>
                            </InputRow>
                            <InputRow style={{margin: 50}} />
                            <Row>
                                <Button
                                    onPress={handleSubmit(handleSave)}
                                    style={{width: '50%'}}
                                >
                                    {expense
                                        ? t('budgetForm.save')
                                        : t('budgetForm.add')}
                                </Button>
                                <Button
                                    style={{width: '50%'}}
                                    variant={'secondaryFilled'}
                                    onPress={() => {
                                        router.navigate(ExpenseListRoutes.LIST);
                                    }}
                                >
                                    {t('budgetForm.cancel')}
                                </Button>
                            </Row>
                        </FormInputWrapper>

                        <CustomOverlay
                            isVisible={isDatepickerVisible}
                            variant={'bottom'}
                            onBackdropPress={() => handleCancel()}
                        >
                            <DatepickerContainer>
                                <Controller
                                    control={control}
                                    name={'deadline'}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <Calendar
                                            mode={'single'}
                                            onDateChange={(date) => {
                                                onChange(dayjs(date).toDate());
                                            }}
                                            date={dayjs(value).format('YYYY-MM-DD')}
                                            minDate={dayjs()}
                                            maxDate={dayjs().add(
                                                MAX_YEARS_FORWARD,
                                                'years',
                                            )}
                                            locale={i18n.language}
                                            selectedColor={Colors.LightGreen}
                                        />
                                    )}
                                />
                            </DatepickerContainer>
                        </CustomOverlay>

                        <CustomOverlay
                            isVisible={isCategoryPickVisible}
                            variant={'center'}
                        >
                            <CategorypickerContainer>
                                <Controller
                                    control={control}
                                    name={'categoryId'}
                                    render={({
                                        field: {onChange, value},
                                        fieldState: {error},
                                    }) => (
                                        <FlatList
                                            data={catsData}
                                            renderItem={({item}: any) => {
                                                const data = getBudgetCategoryData(
                                                    item.id,
                                                );
                                                return (
                                                    <CategorypickerItem
                                                        onPress={() => {
                                                            onChange(item.id);
                                                            handleCancel();
                                                        }}
                                                    >
                                                        <IconDot
                                                            color={data.color}
                                                            Icon={data.icon}
                                                        />
                                                        <Text.SemiBold>
                                                            {t(
                                                                `category.${item.name}`,
                                                            )}
                                                        </Text.SemiBold>
                                                    </CategorypickerItem>
                                                );
                                            }}
                                        />
                                    )}
                                />

                                <Button
                                    onPress={() => handleCancel()}
                                    style={{width: '50%'}}
                                >
                                    {t('budgetForm.cancel')}
                                </Button>
                            </CategorypickerContainer>
                        </CustomOverlay>
                    </>
                )}
            </BudgetMainWrapper>
        </Container>
    );
};

export default ExpenseForm;
