import {Text} from '@weddesign/themes';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';
import {
    BackgroundEllipse,
    Button,
    Header,
    IconDot,
    Input,
    LoadingSpinner,
    Modal,
} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes} from '@weddesign/enums';
import {ExpenseCategoryDto} from '@shared/dto';

import {useMainLimit} from '../../../api/Budget/useMainLimit';
import {useCatsData} from '../../../api/Budget/useCatsData';
import {useRouting} from '../../providers';

import {
    Container,
    MainWrapper,
    TotalWrapper,
    CategoryListItem,
    StatusDot,
    CategoryInfoContainer,
    ModalContainer,
    ModalRow,
} from './styles';

const BudgetLimits = () => {
    const {t} = useTranslation('budget');
    const {router} = useRouting();
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalValue, setModalValue] = useState(0);
    const [selectedItem, setSelectedItem] = useState<ExpenseCategoryDto | null>(
        null,
    );

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
        isFetching: isFetchingMainLimit,
    } = useMainLimit();
    const {
        data: catsData,
        isLoading: isLoadingCats,
        isError: isErrorCats,
        isFetching: isFetchingCats,
    } = useCatsData();

    const handleOK = () => {
        setModalVisible(false);
        console.log('zmiana', selectedItem.name, 'na', modalValue.toString());
        // setStatusModalVisible(false);
    };

    const handleDelete = () => {
        setModalVisible(false);
        console.log('usunięcie', selectedItem.name);
        // setStatusModalVisible(false);
    };

    const renderItem = ({item}: any) => {
        const data = getBudgetCategoryData(item.id);
        return (
            <CategoryListItem
                onPress={() => {
                    console.log('edit:', item.name);
                    setSelectedItem(item);
                    setModalValue(selectedItem && item.limit);
                    setModalVisible(true);
                }}
            >
                <CategoryInfoContainer>
                    <StatusDot color={data.color}>
                        <data.icon />
                    </StatusDot>
                    <Text.SemiBold size={14}>
                        {t(`category.${item.name}`)}
                    </Text.SemiBold>
                </CategoryInfoContainer>

                <Text.Bold size={14}>
                    {item.limit ? `${item.limit}${t('currency')}` : t('noLimit')}
                </Text.Bold>
            </CategoryListItem>
        );
    };

    useEffect(() => {
        if (isErrorCats || isErrorMainLimit) {
            router.navigate(ErrorRoutes.GENERAL, 'budget');
        }
    }, [isErrorCats, isErrorMainLimit, router]);

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            {isLoadingMainLimit || isLoadingCats ? (
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            ) : (
                <MainWrapper>
                    <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                    <TotalWrapper onPress={() => console.log('edit: MAIN')}>
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        <Text.Bold size={24}>{`${t('total')}:`}</Text.Bold>
                        <Text.SemiBold size={24}>
                            {/* eslint-disable-next-line react-native/no-raw-text */}
                            {`${mainLimitData.limit} ${t('currency')}`}
                        </Text.SemiBold>
                    </TotalWrapper>
                    <FlatList
                        data={catsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}
                    >
                        <ModalContainer>
                            <Text.Bold size={14}>Ustaw limit</Text.Bold>
                            <ModalRow>
                                {(() => {
                                    const data = getBudgetCategoryData(
                                        selectedItem ? selectedItem.id : 1,
                                    );
                                    return (
                                        <IconDot
                                            color={data.color}
                                            Icon={data.icon}
                                        ></IconDot>
                                    );
                                })()}
                                <Input
                                    style={{width: '60%'}}
                                    handleChange={(v) => {
                                        setModalValue(v ? valueOf(v) : 0);
                                    }}
                                    value={modalValue && modalValue.toString()}
                                    placeholder={t('Ustaw limit')}
                                    inputMode={'numeric'}
                                    multiline={false}
                                    maxLength={400}
                                    onFocus={() => console.log('focus')}
                                    onBlur={() => console.log('blur')}
                                />
                            </ModalRow>
                            <Text.Bold size={14}>'suwaczek'</Text.Bold>
                            <ModalRow>
                                <Button
                                    style={{width: '50%'}}
                                    variant="primary"
                                    onPress={() => handleOK()}
                                >
                                    {t('OK')}
                                </Button>
                                <Button
                                    style={{width: '50%'}}
                                    variant="secondaryFilled"
                                    onPress={() => handleDelete()}
                                >
                                    {t('USUŃ LIMIT')}
                                </Button>
                            </ModalRow>
                        </ModalContainer>
                    </Modal>
                </MainWrapper>
            )}
        </Container>
    );
};
export default BudgetLimits;
