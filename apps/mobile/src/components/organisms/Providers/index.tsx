import React from 'react';
import {
    BackgroundEllipse,
    CustomOverlay,
    Header,
    LoadingSpinner,
} from '@weddesign/components';
import {useRouting} from '@mobile/components';
import {useTranslation} from 'react-i18next';
import {Colors} from '@weddesign/enums';

import {GuestListWrapper} from '../GuestList/styles';

import {Container} from './styles';

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
            <GuestListWrapper>
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
            </GuestListWrapper>
        </Container>
    );
};

export default ProvidersGrouped;
