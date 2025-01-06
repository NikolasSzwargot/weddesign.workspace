import {Text} from '@weddesign/themes';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';
import {BackgroundEllipse, Header, LoadingSpinner} from '@weddesign/components';
import {Colors, ErrorRoutes, HomeRoutes} from '@weddesign/enums';

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
} from './styles';

const BudgetLimits = () => {
    const {t} = useTranslation('budget');
    const {router} = useRouting();

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

    const renderItem = ({item}: any) => {
        const data = getBudgetCategoryData(item.id);
        return (
            <CategoryListItem onPress={() => console.log('edit:', item.name)}>
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
                </MainWrapper>
            )}
        </Container>
    );
};
export default BudgetLimits;
