import {Text} from '@weddesign/themes';
import React from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {categoriesData} from '@mobile/mocks';
import {getBudgetCategoryData} from '@mobile/utils';
import {DudgetEllipse, Header} from '@weddesign/components';

import {
    Container,
    MainWrapper,
    TotalWrapper,
    CategoryListItem,
    StatusDot,
} from './styles';

const BudgetLimits = () => {
    const {t} = useTranslation('budget');
    const renderItem = ({item}: any) => {
        const data = getBudgetCategoryData(item.name);
        return (
            <CategoryListItem>
                <StatusDot color={data.color}>
                    <data.icon />
                </StatusDot>
                <Text.SemiBold size={14}>{t(`category.${item.name}`)}</Text.SemiBold>
                <Text.Bold size={14}>
                    {item.limit ? `${item.limit} $` : 'Brak limitu'}
                </Text.Bold>
            </CategoryListItem>
        );
    };

    return (
        <Container>
            <DudgetEllipse />
            <MainWrapper>
                <Header />
                <TotalWrapper>
                    <Text.Bold size={24}>TOTAL:</Text.Bold>
                    <Text.SemiBold size={24}>bida w kraju $</Text.SemiBold>
                </TotalWrapper>
                <FlatList
                    // getBudgetCategoryData
                    // style={{backgroundColor: Colors.TextGrey}}
                    data={categoriesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </MainWrapper>
        </Container>
    );
};
export default BudgetLimits;
