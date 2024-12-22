import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
// Import ScrollView
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
    BackgroundEllipse,
    BudgetFrame,
    BudgetStatusBar,
    Button,
    CustomOverlay,
    CustomSwitch,
    DropdownSelect,
    Header,
    Input,
    LoadingSpinner,
} from '@weddesign/components';
import {Colors, ExpenseListRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {useRouting} from '@mobile/components';
import {Controller, useForm} from 'react-hook-form';
import {CreateExpenseDto} from '@shared/dto';

import {useMainLimit} from '../../../../api/Budget/useMainLimit';

import {
    BudgetMainFrame,
    BudgetMainWrapper,
    Container,
    DatepickerContainer,
    DatepickerOpenBox,
    FormInputWrapper,
    InputRow,
    Row,
} from './styles';

const ExpenseForm = () => {
    const {router} = useRouting();
    const {t} = useTranslation('budget');
    const [isDatepickerVisible, setDatepickerVisible] = useState(false);
    const {control, handleSubmit, setValue} = useForm<CreateExpenseDto>({
        defaultValues: {
            amount: 0,
            name: '',
            description: '',
            categoryId: 15,
            isPaid: false,
            deadline: new Date(Date.now()),
        },
    });
    const dropdownData = Array.from({length: 16}, (_, index) => ({
        label: index.toString(),
        value: index,
    }));

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
        isFetching: isFetchingMainLimit,
    } = useMainLimit();

    const handleCancel = () => {
        setDatepickerVisible(false);
    };
    const parseDate = (dateWithDots: string) => {
        const dateParts = dateWithDots.split('.').reverse();
        return [
            dateParts[0],
            dateParts[1].padStart(2, '0'),
            dateParts[2].padStart(2, '0'),
        ].join('-');
    };

    LocaleConfig.locales['pl'] = {
        monthNames: [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień',
        ],
        monthNamesShort: [
            'Janv.',
            'Févr.',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juil.',
            'Août',
            'Sept.',
            'Oct.',
            'Nov.',
            'Déc.',
        ],
        dayNames: [
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota',
            'Niedziela',
        ],
        dayNamesShort: ['Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.', 'Nd.'],
        today: 'Dzisiaj',
    };

    LocaleConfig.defaultLocale = 'pl';

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            <BudgetMainWrapper>
                <Header />
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
                                    {/*    dropdown z kategorią */}
                                    <Controller
                                        control={control}
                                        name={'categoryId'}
                                        render={({
                                            field: {onChange, value},
                                            fieldState: {error},
                                        }) => (
                                            <>
                                                {/*<Text.SemiBold*/}
                                                {/*    style={{width: '30%'}}*/}
                                                {/*>*/}
                                                {/*    {'tu bedzie dropdown'}*/}
                                                {/*</Text.SemiBold>*/}
                                                <DropdownSelect
                                                    value={value}
                                                    data={dropdownData}
                                                    onChange={onChange}
                                                />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={'amount'}
                                        render={({
                                            field: {onChange, value},
                                            fieldState: {error},
                                        }) => (
                                            <Input
                                                value={value.toString()}
                                                handleChange={onChange}
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
                                            value={value.toString()}
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
                                            value={value.toString()}
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
                                        {'Opłacono wydatek'}
                                    </Text.SemiBold>
                                </Row>
                            </InputRow>
                            <InputRow>
                                <Row>
                                    <Text.SemiBold>{'Deadline: '}</Text.SemiBold>
                                    <DatepickerOpenBox
                                        onPress={() => setDatepickerVisible(true)}
                                    >
                                        <Text.SemiBold>
                                            {control._formValues.deadline.toDateString()}
                                        </Text.SemiBold>
                                    </DatepickerOpenBox>
                                </Row>
                            </InputRow>
                            <Row>
                                <Button style={{width: '50%'}}>
                                    {t('budgetForm.save')}
                                </Button>
                                <Button
                                    style={{width: '50%'}}
                                    variant={'secondaryFilled'}
                                    onPress={() =>
                                        router.navigate(ExpenseListRoutes.LIST)
                                    }
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
                                            hideArrows={false}
                                            theme={{
                                                arrowColor: Colors.LightGreen,
                                            }}
                                            onDayPress={(day) => {
                                                onChange(new Date(day.timestamp));
                                            }}
                                            markedDates={{
                                                [parseDate(
                                                    value.toLocaleDateString(),
                                                )]: {
                                                    selected: true,
                                                    selectedColor: Colors.LightGreen,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Text.SemiBold>{'Opłacono wydatek'}</Text.SemiBold>
                                <Text.SemiBold>{'Opłacono wydatek'}</Text.SemiBold>
                            </DatepickerContainer>
                        </CustomOverlay>
                    </>
                )}
            </BudgetMainWrapper>
        </Container>
    );
};

export default ExpenseForm;
