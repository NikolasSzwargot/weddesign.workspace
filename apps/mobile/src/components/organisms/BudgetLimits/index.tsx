import {Text} from '@weddesign/themes';
import React from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getBudgetCategoryData} from '@mobile/utils';
import {BackgroundEllipse, Header, LoadingSpinner} from '@weddesign/components';
import {Colors} from '@weddesign/enums';

import {useMainLimit} from '../../../api/Budget/useMainLimit';
import {useCatsData} from '../../../api/Budget/useCatsData';

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
                    {item.limit ? `${item.limit} $` : 'Brak limitu'}
                </Text.Bold>
            </CategoryListItem>
        );
    };

    return (
        <Container>
            <BackgroundEllipse variant={'budget'} />
            {isLoadingMainLimit || isLoadingCats ? (
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            ) : isErrorCats || isErrorMainLimit ? (
                <Text.Regular style={{position: 'absolute', top: '50%'}}>
                    {/* @TODO przejście na ekran z błędem*/}
                    {/* eslint-disable-next-line react-native/no-raw-text */}
                    {'Tu będzie takie fajne przejście do ekranu błędu'}
                </Text.Regular>
            ) : (
                <MainWrapper>
                    <Header />
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
