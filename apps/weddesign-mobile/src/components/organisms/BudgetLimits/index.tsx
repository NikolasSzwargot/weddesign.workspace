import {Text} from '@weddesign/themes';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';
import {
    BackgroundEllipse,
    Button,
    CustomSlider,
    Header,
    IconDot,
    Input,
    LoadingSpinner,
    Modal,
} from '@weddesign/components';
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
    ModalContainer,
    ModalRow,
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

                    <Modal
                        isVisible={isModalVisible}
                        onBackdropPress={() => setModalVisible(false)}
                    >
                        <ModalContainer>
                            <Text.SemiBold size={20}>Ustaw limit</Text.SemiBold>
                            <ModalRow>
                                {(() => {
                                    if (selectedItem) {
                                        const data = getBudgetCategoryData(
                                            selectedItem
                                                ? selectedItem.categoryId
                                                : 1,
                                        );
                                        return (
                                            <IconDot
                                                color={data.color}
                                                Icon={data.icon}
                                            ></IconDot>
                                        );
                                    } else {
                                        return (
                                            <Text.SemiBold>{`${t(
                                                'total',
                                            )}:`}</Text.SemiBold>
                                        );
                                    }
                                })()}
                                <Input
                                    style={{width: '80%'}}
                                    handleChange={(v) => {
                                        const numericValue = v ? Number(v) : 0;
                                        setModalValue(numericValue);
                                    }}
                                    value={modalValue && modalValue.toString()}
                                    placeholder={t('Ustaw limit')}
                                    inputMode={'numeric'}
                                    multiline={false}
                                    maxLength={12}
                                    onFocus={() => console.log('focus')}
                                    onBlur={() => console.log('blur')}
                                />
                            </ModalRow>
                            <CustomSlider
                                min={0}
                                max={mainLimitData ? mainLimitData.limit : 100000}
                                step={1000}
                                value={modalValue}
                                initialValue={modalValue}
                                onValueChange={(value) => {
                                    setModalValue(value);
                                }}
                                label="Ustaw limit"
                                unit="$"
                            />
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
