import {Text} from '@weddesign/themes';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';
import {BudgetLimitEditionModal} from '@weddesign-mobile/components';
import {BackgroundEllipse, Header, LoadingSpinner} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes} from '@weddesign/enums';
import {UpdateCategoryLimitDto} from '@shared/dto';

import {useMainLimit} from '../../../api/Budget/useMainLimit';
import {useCatsData} from '../../../api/Budget/useCatsData';
import {useRouting} from '../../providers';
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
    const {mutate: updateLimit, isLoading: isLoadingUpdate} =
        useUpdateCategoryLimit();

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
    const {
        data: categoriesLimits,
        isLoading: isLoadingLimits,
        isError: isErrorLimits,
        isFetching: isFetchingLimits,
    } = useCategoriesLimits();

    useEffect(() => {
        if (!isLoadingCats && !isLoadingLimits) {
            const updatedResultListData = categoriesLimits
                .map((limitItem) => {
                    const firstItem = catsData.find(
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
    }, [categoriesLimits, catsData]);

    const handleOK = () => {
        setModalVisible(false);
        if (selectedItem) {
            console.log('zmiana', selectedItem.name, 'na', modalValue.toString());
            updateLimit({
                categoryId: selectedItem.categoryId,
                updateCategoryLimitDto: {
                    limit: modalValue,
                } as UpdateCategoryLimitDto,
            });
        } else {
            console.log('main limit update');
        }
    };

    const handleDelete = () => {
        setModalVisible(false);
        if (selectedItem) {
            console.log('usunięcie', selectedItem.name);
            updateLimit({
                categoryId: selectedItem.categoryId,
                updateCategoryLimitDto: {
                    limit: 0,
                } as UpdateCategoryLimitDto,
            });
        } else {
            console.log('main limit clearing');
        }
    };

    const renderItem = ({item}: any) => {
        const data = getBudgetCategoryData(item.categoryId);
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
        if (isErrorCats || isErrorMainLimit || isErrorLimits) {
            router.navigate(ErrorRoutes.GENERAL, 'budget');
        }
    }, [isErrorCats, isErrorMainLimit, router]);

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            {isLoadingMainLimit || isLoadingCats || isLoadingLimits ? (
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            ) : (
                <MainWrapper>
                    <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                    <TotalWrapper
                        onPress={() => {
                            console.log('edit: MAIN');
                            setSelectedItem(null);
                            setModalValue(mainLimitData.limit);
                            setModalVisible(true);
                        }}
                    >
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        <Text.Bold size={24}>{`${t('total')}:`}</Text.Bold>
                        <Text.SemiBold size={24}>
                            {/* eslint-disable-next-line react-native/no-raw-text */}
                            {`${mainLimitData.limit} ${t('currency')}`}
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
