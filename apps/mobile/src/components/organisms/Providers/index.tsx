import React from 'react';
import {
    BackgroundEllipse,
    CustomOverlay,
    Header,
    LoadingSpinner,
    ProvidersCategoryItem,
} from '@weddesign/components';
import {useRouting} from '@mobile/components';
import {useTranslation} from 'react-i18next';
import {Colors} from '@weddesign/enums';

import {
    CategoriesWrapper,
    Container,
    FloatingButton,
    ProvidersCategoriesWrapper,
} from './styles';

const ProvidersGrouped = () => {
    const {router} = useRouting();
    const {t} = useTranslation('providers');

    const isLoading = false;
    const isDeleting = false;
    const isFetching = false;
    const isAdding = false;

    return (
        <Container>
            <BackgroundEllipse variant={'providers'} />
            <ProvidersCategoriesWrapper>
                <Header />
                {isLoading ? (
                    <LoadingSpinner
                        color={Colors.LightPurple}
                        msg={t('shared:spinnerMessage')}
                    />
                ) : (
                    <>
                        {/*<SectionList*/}
                        {/*    sections={groupedGuests}*/}
                        {/*    initialNumToRender={20}*/}
                        {/*    keyExtractor={(item) => item.id.toString()}*/}
                        {/*    renderItem={({item}) => (*/}
                        {/*        <GuestItem*/}
                        {/*            guest={item}*/}
                        {/*            onStatusPress={handleStatusChangeModal}*/}
                        {/*            onGuestPress={() =>*/}
                        {/*                router.navigate(GuestListRoutes.ADD, item)*/}
                        {/*            }*/}
                        {/*            onDeletePress={handleDelete}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*    renderSectionHeader={CustomSectionHeader}*/}
                        {/*    showsVerticalScrollIndicator={true}*/}
                        {/*/>*/}
                        <CategoriesWrapper>
                            <ProvidersCategoryItem
                                id={1}
                                name={'Miejsce'}
                                inDatabase={0}
                                reserved={0}
                                inDatabaseLabel={'w bazie:'}
                                reservedLabel={'zarezerwowano:'}
                                onPress={() => console.log('Idziemy do listy')}
                            ></ProvidersCategoryItem>
                        </CategoriesWrapper>

                        <FloatingButton></FloatingButton>
                        <CustomOverlay
                            isVisible={isDeleting || isAdding || isFetching}
                            variant={'center'}
                        >
                            <LoadingSpinner
                                color={Colors.LightPurple}
                            ></LoadingSpinner>
                        </CustomOverlay>
                    </>
                )}
            </ProvidersCategoriesWrapper>
        </Container>
    );
};

export default ProvidersGrouped;
