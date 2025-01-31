import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';
import {Colors} from '@weddesign/enums';
import {Input} from '@weddesign/components';
import {CheckBox} from 'react-native-elements';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';

import {useTaskFilter} from '../../providers';

import {Container, InputsRow, RadioContainer, Row} from './styles';

export const TasksFilterDateRange = () => {
    const {t} = useTranslation('tasks');
    const {filter, setFilter} = useTaskFilter();
    const [openMinPicker, setOpenMinPicker] = useState<boolean>(false);
    const [openMaxPicker, setOpenMaxPicker] = useState<boolean>(false);

    return (
        <Container>
            <Text.Regular style={{color: Colors.FilterGray}}>
                {t('filters.dateRange')}
            </Text.Regular>
            <InputsRow>
                <Input
                    value={
                        filter.minDate
                            ? new Date(filter.minDate).toLocaleDateString('pl-PL', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                              })
                            : ''
                    }
                    handleChange={() => {}}
                    placeholder={'Min'}
                    onPress={() => setOpenMinPicker(true)}
                    inputMode={'none'}
                />
                <Input
                    value={
                        filter.maxDate
                            ? new Date(filter.maxDate).toLocaleDateString('pl-PL', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                              })
                            : ''
                    }
                    handleChange={() => {}}
                    placeholder={'Max'}
                    onPress={() => setOpenMaxPicker(true)}
                    inputMode={'none'}
                />
            </InputsRow>
            <RadioContainer>
                <Row
                    onPress={() =>
                        setFilter((current) => ({
                            ...current,
                            showFor: 90,
                            minDate: undefined,
                            maxDate: undefined,
                        }))
                    }
                >
                    <CheckBox
                        iconType="material-community"
                        checkedIcon="radiobox-marked"
                        uncheckedIcon="radiobox-blank"
                        checkedColor={Colors.DarkYellow}
                        checked={filter.showFor === 90}
                        onPress={() =>
                            setFilter((current) => ({
                                ...current,
                                showFor: 90,
                                minDate: undefined,
                                maxDate: undefined,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.months')}</Text.Regular>
                </Row>
                <Row
                    onPress={() =>
                        setFilter((current) => ({
                            ...current,
                            showFor: 180,
                            minDate: undefined,
                            maxDate: undefined,
                        }))
                    }
                >
                    <CheckBox
                        iconType="material-community"
                        checkedIcon="radiobox-marked"
                        uncheckedIcon="radiobox-blank"
                        checkedColor={Colors.DarkYellow}
                        checked={filter.showFor === 180}
                        onPress={() =>
                            setFilter((current) => ({
                                ...current,
                                showFor: 180,
                                minDate: undefined,
                                maxDate: undefined,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.halfYear')}</Text.Regular>
                </Row>
                <Row
                    onPress={() =>
                        setFilter((current) => ({
                            ...current,
                            showFor: 365,
                            minDate: undefined,
                            maxDate: undefined,
                        }))
                    }
                >
                    <CheckBox
                        iconType="material-community"
                        checkedIcon="radiobox-marked"
                        uncheckedIcon="radiobox-blank"
                        checkedColor={Colors.DarkYellow}
                        checked={filter.showFor === 365}
                        onPress={() =>
                            setFilter((current) => ({
                                ...current,
                                showFor: 365,
                                minDate: undefined,
                                maxDate: undefined,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.year')}</Text.Regular>
                </Row>
            </RadioContainer>
            <DatePicker
                modal
                open={openMinPicker}
                date={filter.minDate ?? new Date()}
                onCancel={() => setOpenMinPicker(false)}
                onConfirm={(date) => {
                    if (filter.maxDate && date > filter.maxDate) {
                        setFilter((prev) => ({
                            ...prev,
                            showFor: undefined,
                            minDate: prev.maxDate,
                        }));
                    } else {
                        setFilter((prev) => ({
                            ...prev,
                            minDate: date,
                            showFor: undefined,
                        }));
                    }
                    setOpenMinPicker(false);
                }}
            />
            <DatePicker
                modal
                open={openMaxPicker}
                date={filter.maxDate ?? new Date()}
                onCancel={() => setOpenMaxPicker(false)}
                onConfirm={(date) => {
                    if (filter.minDate && date < filter.minDate) {
                        setFilter((prev) => ({
                            ...prev,
                            showFor: undefined,
                            maxDate: prev.minDate,
                        }));
                    } else {
                        setFilter((prev) => ({
                            ...prev,
                            maxDate: date,
                            showFor: undefined,
                        }));
                    }
                    setOpenMaxPicker(false);
                }}
            />
        </Container>
    );
};
