import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
    BackgroundEllipse,
    CustomOverlay,
    Header,
    IconButton,
    LoadingSpinner,
    ProvidersCategoryItem,
} from '@weddesign/components';
import {useRouting} from '@mobile/components';
import {useTranslation} from 'react-i18next';
import {Colors, ErrorRoutes} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {Category} from '@weddesign/types';

import {MockedProvidersCategories} from '../../../mocks/MockedProvidersCategories';
import {WeddesignConfirmationModal} from '../../molecules';

import {CategoriesWrapper, Container, ProvidersCategoriesWrapper} from './styles';

const ProvidersGrouped = () => {
    const {router} = useRouting();
    const {t} = useTranslation('providers');

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Category | null>(null); //@TODO: Użyć DTO z shared
    const [confirmationModalText, setConfirmationModalText] = useState('');

    const isLoading = false;
    const isDeleting = false;
    const isFetching = false;
    const isAdding = false;
    const isError = false;

    const handleSuccess = () => {
        console.log('Success');
    };

    const handleError = () => {
        router.navigate(ErrorRoutes.GENERAL, 'providers');
    };

    const handleDelete = (category: Category) => {
        //@TODO: użyć DTO z shared
        setSelectedItem(category);
        setConfirmationModalText(
            t('deleteMessage', {
                name: category.name,
            }),
        );
        setModalVisible(!isModalVisible);
    };
    const handleYes = () => {
        setModalVisible(false);
        console.log('Yes');
        console.log(selectedItem);
    };
    const handleCancel = () => {
        setModalVisible(false);
        console.log('No');
    };

    useEffect(() => {
        if (isError) {
            router.navigate(ErrorRoutes.GENERAL, 'providers');
        }
    }, [isError, router]);

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
                        <CategoriesWrapper>
                            <FlatList
                                data={MockedProvidersCategories}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <ProvidersCategoryItem
                                        category={item}
                                        inDatabaseLabel={t('inDatabase')}
                                        reservedLabel={t('reserved')}
                                        onPress={() =>
                                            console.log('Idziemy do listy')
                                        }
                                        onLongPress={handleDelete}
                                    />
                                )}
                                ItemSeparatorComponent={() => (
                                    <View style={{height: 10}} />
                                )}
                                showsVerticalScrollIndicator={true}
                                initialNumToRender={20}
                            />
                        </CategoriesWrapper>

                        <IconButton
                            Icon={Icons.Plus}
                            fillColor={Colors.LightPurple}
                            onPress={() => console.log('dodawanie kategorii')}
                            variant={'roundFloating'}
                        />

                        <CustomOverlay
                            isVisible={isDeleting || isAdding || isFetching}
                            variant={'center'}
                        >
                            <LoadingSpinner
                                color={Colors.LightPurple}
                            ></LoadingSpinner>
                        </CustomOverlay>

                        <WeddesignConfirmationModal
                            isVisible={isModalVisible}
                            onBackdropPress={handleCancel}
                            onYesPress={handleYes}
                            onNoPress={handleCancel}
                            message={confirmationModalText}
                        ></WeddesignConfirmationModal>
                    </>
                )}
            </ProvidersCategoriesWrapper>
        </Container>
    );
};

export default ProvidersGrouped;
