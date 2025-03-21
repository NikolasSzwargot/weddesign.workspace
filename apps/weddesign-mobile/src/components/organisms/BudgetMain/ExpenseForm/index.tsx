import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
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

import {
    useMainLimit,
    useCreateExpense,
    useUpdateExpense,
    useCategoriesData,
} from '../../../../api';

import {
    AmountRow,
    BudgetMainFrame,
    BudgetMainWrapper,
    CategoryContainer,
    CategoryPickerContainer,
    CategoryPickerItem,
    Container,
    DatePickerContainer,
    DatePickerOpenBox,
    ErrorArea,
    FirstRow,
    FormInputWrapper,
    InputRow,
    Row,
} from './styles';

const MAX_YEARS_FORWARD = 5;

const ExpenseForm = () => {
    const {router} = useRouting();
    const {t, i18n} = useTranslation('budget');
    const [isDatepickerVisible, setDatepickerVisible] = useState(false);
    const [isCategoryPickVisible, setCategoryPickVisible] = useState(false);
    const {mutate: createExpense} = useCreateExpense();
    const {mutate: updateExpense} = useUpdateExpense();
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

    const {data: categoriesData, isLoading: isLoadingCategories} =
        useCategoriesData();

    const {data: mainLimitData, isLoading: isLoadingMainLimit} = useMainLimit();

    const handleSave = (data: CreateExpenseDto | UpdateExpenseDto) => {
        const handleSuccess = () => {
            router.navigate(ExpenseListRoutes.LIST);
        };

        const handleError = () => {
            console.log('Error saving expense!');
        };

        if (typeof data.amount === 'string') {
            data.amount = Number(Number(data.amount).toFixed(2));
        }
        if (typeof data.amount !== 'number' || isNaN(data.amount)) {
            console.error('Invalid amount: Amount must be a number.');
            return;
        }

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
                {isLoadingMainLimit || isLoadingCategories ? (
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
                                <FirstRow>
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
                                        rules={{
                                            required:
                                                t('errors.amount') ||
                                                'Amount is required',
                                            validate: (value) => {
                                                const numericValue = parseFloat(
                                                    value
                                                        .toString()
                                                        .replace(',', '.'),
                                                );
                                                return (
                                                    numericValue > 0 ||
                                                    t('errors.amount') ||
                                                    'Amount must be greater than 0'
                                                );
                                            },
                                        }}
                                        render={({
                                            field: {onChange, value},
                                            fieldState: {error},
                                        }) => (
                                            <AmountRow>
                                                <Input
                                                    value={value.toString()}
                                                    handleChange={(text) => {
                                                        const formattedText =
                                                            text.replace(',', '.');
                                                        onChange(formattedText);
                                                    }}
                                                    placeholder={`0 ${t(
                                                        'currency',
                                                    )}`}
                                                    inputMode={'decimal'}
                                                    multiline={false}
                                                    maxLength={9}
                                                />
                                                <ErrorArea>
                                                    {error && (
                                                        <Text.Error size={14}>
                                                            {error.message}
                                                        </Text.Error>
                                                    )}
                                                </ErrorArea>
                                            </AmountRow>
                                        )}
                                    />
                                </FirstRow>
                            </InputRow>
                            <InputRow>
                                <Controller
                                    control={control}
                                    name={'name'}
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
                                                placeholder={t('budgetForm.name')}
                                                inputMode={'text'}
                                                maxLength={30}
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
                                    control={control}
                                    name={'description'}
                                    render={({field: {onChange, value}}) => (
                                        <Input
                                            value={value}
                                            handleChange={onChange}
                                            placeholder={t(`budgetForm.description`)}
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
                                        {t('budgetForm.isPaid')}
                                    </Text.SemiBold>
                                </Row>
                            </InputRow>
                            <InputRow>
                                <Row>
                                    <Text.SemiBold>
                                        {t('budgetForm.deadline')}
                                    </Text.SemiBold>
                                    <DatePickerOpenBox
                                        onPress={() => setDatepickerVisible(true)}
                                    >
                                        <Text.SemiBold>
                                            {formatDate(
                                                control._formValues.deadline,
                                                i18n.language,
                                            )}
                                        </Text.SemiBold>
                                    </DatePickerOpenBox>
                                </Row>
                            </InputRow>
                            <InputRow />
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
                            <DatePickerContainer>
                                <Controller
                                    control={control}
                                    name={'deadline'}
                                    render={({field: {onChange, value}}) => (
                                        <Calendar
                                            mode={'single'}
                                            onDateChange={(date) => {
                                                onChange(dayjs(date).toDate());
                                            }}
                                            date={dayjs(value).format('YYYY-MM-DD')}
                                            minDate={dayjs().subtract(
                                                MAX_YEARS_FORWARD,
                                                'years',
                                            )}
                                            maxDate={dayjs().add(
                                                MAX_YEARS_FORWARD,
                                                'years',
                                            )}
                                            locale={i18n.language}
                                            selectedItemColor={Colors.LightGreen}
                                        />
                                    )}
                                />
                            </DatePickerContainer>
                        </CustomOverlay>

                        <CustomOverlay
                            isVisible={isCategoryPickVisible}
                            variant={'center'}
                        >
                            <CategoryPickerContainer>
                                <Controller
                                    control={control}
                                    name={'categoryId'}
                                    render={({field: {onChange}}) => (
                                        <FlatList
                                            data={categoriesData}
                                            renderItem={({item}) => {
                                                const data = getBudgetCategoryData(
                                                    item.id,
                                                );
                                                return (
                                                    <CategoryPickerItem
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
                                                    </CategoryPickerItem>
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
                            </CategoryPickerContainer>
                        </CustomOverlay>
                    </>
                )}
            </BudgetMainWrapper>
        </Container>
    );
};

export default ExpenseForm;
