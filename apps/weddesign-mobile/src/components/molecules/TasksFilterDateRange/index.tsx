import {useTranslation} from 'react-i18next';
import {Text} from '@weddesign/themes';
import {Colors} from '@weddesign/enums';
import {Input} from '@weddesign/components';
import {CheckBox} from 'react-native-elements';

import {useTaskFilter} from '../../providers';

import {Container, InputsRow, RadioContainer, Row} from './styles';

export const TasksFilterDateRange = () => {
    const {t} = useTranslation('tasks');
    const {filter, setFilter} = useTaskFilter();

    return (
        <Container>
            <Text.Regular style={{color: Colors.FilterGray}}>
                {t('filters.dateRange')}
            </Text.Regular>
            <InputsRow>
                <Input value={''} handleChange={() => {}} placeholder={'Min'} />
                <Input value={''} handleChange={() => {}} placeholder={'Max'} />
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
        </Container>
    );
};
