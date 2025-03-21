import {Text} from '@weddesign/themes';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
    formatNumberWithSpaces,
    getBudgetCategoryData,
} from '@weddesign-mobile/utils';
import {BudgetLimitEditionModal} from '@weddesign-mobile/components';
import {BackgroundEllipse, Header, LoadingSpinner} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes} from '@weddesign/enums';
import {UpdateBudgetLimitDto, UpdateCategoryLimitDto} from '@shared/dto';

import {useMainLimit, useCategoriesData} from '../../../api';
import {useRouting} from '../../providers';
import {useUpdateMainLimit} from '../../../api';
import {useUpdateCategoryLimit} from '../../../api';
import {useCategoriesLimits} from '../../../api/Budget/useCategoriesLimits';

import {
    Container,
    MainWrapper,
    TotalWrapper,
    CategoryListItem,
    StatusDot,
    CategoryInfoContainer,
} from './styles';

const BudgetLimits = () => {
    const {t} = useTranslation('budget');
    const {router} = useRouting();
    const [resultListData, setResultListData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalValue, setModalValue] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const {mutate: updateMainLimit} = useUpdateMainLimit();
    const {mutate: updateLimit} = useUpdateCategoryLimit();

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
    } = useMainLimit();
    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useCategoriesData();
    const {
        data: categoriesLimits,
        isLoading: isLoadingLimits,
        isError: isErrorLimits,
    } = useCategoriesLimits();

    useEffect(() => {
        if (!isLoadingCategories && !isLoadingLimits) {
            const updatedResultListData = categoriesLimits
                .map((limitItem) => {
                    const firstItem = categoriesData.find(
                        (dataItem) => dataItem.id === limitItem.categoryId,
                    );
                    return {
                        categoryId: limitItem.categoryId,
                        name: firstItem?.name,
                        limit: limitItem.limit,
                    };
                })
                .sort((a, b) => a.categoryId - b.categoryId);
            setResultListData(updatedResultListData);
        }
    }, [categoriesLimits, categoriesData, isLoadingCategories, isLoadingLimits]);

    const handleOK = () => {
        setModalVisible(false);
        if (selectedItem) {
            updateLimit({
                categoryId: selectedItem.categoryId,
                updateCategoryLimitDto: {
                    limit: modalValue,
                } as UpdateCategoryLimitDto,
            });
        } else {
            updateMainLimit({
                updateMainLimitDto: {
                    limit: modalValue,
                } as UpdateBudgetLimitDto,
            });
        }
    };

    const handleDelete = () => {
        setModalVisible(false);
        if (selectedItem) {
            updateLimit({
                categoryId: selectedItem.categoryId,
                updateCategoryLimitDto: {
                    limit: 0,
                } as UpdateCategoryLimitDto,
            });
        } else {
            updateMainLimit({
                updateMainLimitDto: {
                    limit: 0,
                } as UpdateBudgetLimitDto,
            });
        }
    };

    const renderItem = ({item}) => {
        const data = getBudgetCategoryData(item.categoryId);
        return (
            <CategoryListItem
                onPress={() => {
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
                    {item.limit
                        ? `${formatNumberWithSpaces(item.limit)} ${t('currency')}`
                        : t('noLimit')}
                </Text.Bold>
            </CategoryListItem>
        );
    };

    useEffect(() => {
        if (isErrorCategories || isErrorMainLimit || isErrorLimits) {
            router.navigate(ErrorRoutes.GENERAL, 'budget');
        }
    }, [isErrorCategories, isErrorMainLimit, isErrorLimits, router]);

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            {isLoadingMainLimit || isLoadingCategories || isLoadingLimits ? (
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            ) : (
                <MainWrapper>
                    <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                    <TotalWrapper
                        onPress={() => {
                            setSelectedItem(null);
                            setModalValue(mainLimitData.limit);
                            setModalVisible(true);
                        }}
                    >
                        <Text.Bold size={24}>{t('total') + ':'}</Text.Bold>
                        <Text.SemiBold size={24}>
                            {`${formatNumberWithSpaces(mainLimitData.limit)} ` +
                                t('currency')}
                        </Text.SemiBold>
                    </TotalWrapper>
                    <FlatList
                        data={resultListData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.categoryId.toString()}
                    />

                    <BudgetLimitEditionModal
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}
                        modalValue={modalValue}
                        setModalValue={setModalValue}
                        selectedItem={selectedItem}
                        handleOK={handleOK}
                        handleDelete={handleDelete}
                        mainLimit={mainLimitData.limit}
                    />
                </MainWrapper>
            )}
        </Container>
    );
};
export default BudgetLimits;
