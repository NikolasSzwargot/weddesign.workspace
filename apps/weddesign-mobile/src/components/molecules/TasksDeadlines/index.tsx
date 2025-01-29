import {Text} from '@weddesign/themes';
import {Colors} from '@weddesign/enums';
import {CheckBox} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {FilterTaskDto} from '@shared/dto';
import {Dispatch, SetStateAction} from 'react';

import {CheckboxesColumn, DeadlinesContainer, Row} from './styles';

type TasksDeadlinesProps = {
    filter: FilterTaskDto;
    setFilter: Dispatch<SetStateAction<FilterTaskDto>>;
};

export const TasksDeadlines = ({filter, setFilter}: TasksDeadlinesProps) => {
    const {t} = useTranslation('tasks');

    return (
        <DeadlinesContainer>
            <Text.Regular style={{color: Colors.FilterGray}}>
                {t('filters.deadline')}
            </Text.Regular>
            <CheckboxesColumn>
                <Row
                    onPress={() =>
                        setFilter((currentFilter) => ({
                            ...currentFilter,
                            withoutDeadline: !currentFilter?.withoutDeadline,
                        }))
                    }
                >
                    <CheckBox
                        checked={filter?.withoutDeadline ?? false}
                        checkedColor={Colors.DarkYellow}
                        onPress={() =>
                            setFilter((currentFilter) => ({
                                ...currentFilter,
                                withoutDeadline: !currentFilter?.withoutDeadline,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.unscheduled')}</Text.Regular>
                </Row>
                <Row
                    onPress={() =>
                        setFilter((currentFilter) => ({
                            ...currentFilter,
                            afterDeadline: !currentFilter?.afterDeadline,
                        }))
                    }
                >
                    <CheckBox
                        checked={filter?.afterDeadline ?? false}
                        checkedColor={Colors.DarkYellow}
                        onPress={() =>
                            setFilter((currentFilter) => ({
                                ...currentFilter,
                                afterDeadline: !currentFilter?.afterDeadline,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.afterDeadline')}</Text.Regular>
                </Row>
                <Row
                    onPress={() =>
                        setFilter((currentFilter) => ({
                            ...currentFilter,
                            beforeDeadline: !currentFilter?.beforeDeadline,
                        }))
                    }
                >
                    <CheckBox
                        checked={filter?.beforeDeadline ?? false}
                        checkedColor={Colors.DarkYellow}
                        onPress={() =>
                            setFilter((currentFilter) => ({
                                ...currentFilter,
                                beforeDeadline: !currentFilter?.beforeDeadline,
                            }))
                        }
                    />
                    <Text.Regular>{t('filters.beforeDeadline')}</Text.Regular>
                </Row>
            </CheckboxesColumn>
        </DeadlinesContainer>
    );
};
