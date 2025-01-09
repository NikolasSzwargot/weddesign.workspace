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
import {useTranslation} from 'react-i18next';
import {Colors, ErrorRoutes, ProvidersRoutes, HomeRoutes} from '@weddesign/enums';
import {Icons} from '@weddesign/assets';
import {CategoryToSummaryDto, CreateProviderCategoryDto} from '@shared/dto';

import {useRouting} from '../../providers';
import {
    WeddesignConfirmationModal,
    WeddesignProviderCategoryModal,
} from '../../molecules';
import {useProvidersCategoriesAll} from '../../../api/Providers/useProvidersCategoriesAll';
import {useDeleteCategory} from '../../../api/Providers/useDeleteCategory';
import {useCreateProviderCategory} from '../../../api/Providers/useCreateProviderCategory';

import {CategoriesWrapper, Container, ProvidersCategoriesWrapper} from './styles';

const ProvidersGrouped = () => {
    const {router} = useRouting();
    const {t} = useTranslation('providers');

    const [isModalVisible, setModalVisible] = useState(false);
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CategoryToSummaryDto | null>(
        null,
    );
    const [confirmationModalText, setConfirmationModalText] = useState('');

    const {mutate: deleteCategory, isLoading: isDeleting} = useDeleteCategory();
    const {mutate: createCategory, isLoading: isCreating} =
        useCreateProviderCategory();
    const {
        data: categoriesAll,
        isLoading,
        isError,
        isFetching,
    } = useProvidersCategoriesAll();

    const handleSuccess = () => {
        console.log('Success');
    };

    const handleError = () => {
        router.navigate(ErrorRoutes.GENERAL, 'providers');
    };

    const handleDelete = (category: CategoryToSummaryDto) => {
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
        setCreateModalVisible(false);
        deleteCategory(
            {categoryId: selectedItem.id},
            {
                onSuccess: handleSuccess,
                onError: handleError,
            },
        );
    };
    const handleCreateModal = () => {
        setCreateModalVisible(!isCreateModalVisible);
    };
    const handleCreate = (data: CreateProviderCategoryDto) => {
        setModalVisible(false);
        setCreateModalVisible(false);
        createCategory(data, {
            onSuccess: handleSuccess,
            onError: handleError,
        });
    };
    const handleCancel = () => {
        setModalVisible(false);
        setCreateModalVisible(false);
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
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                {isLoading ? (
                    <LoadingSpinner
                        color={Colors.LightPurple}
                        msg={t('shared:spinnerMessage')}
                    />
                ) : (
                    <>
                        <CategoriesWrapper>
                            <FlatList
                                data={categoriesAll}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <ProvidersCategoryItem
                                        category={item}
                                        inDatabaseLabel={t('inDatabase')}
                                        reservedLabel={t('reserved')}
                                        onPress={() =>
                                            router.navigate(
                                                ProvidersRoutes.LIST,
                                                item,
                                            )
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
                            onPress={handleCreateModal}
                            variant={'roundFloating'}
                        />

                        <CustomOverlay
                            isVisible={isDeleting || isCreating || isFetching}
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
                            warning={t('deleteWarning')}
                        ></WeddesignConfirmationModal>

                        <WeddesignProviderCategoryModal
                            isVisible={isCreateModalVisible}
                            onBackdropPress={handleCancel}
                            onYesPress={handleCreate}
                            onNoPress={handleCancel}
                        />
                    </>
                )}
            </ProvidersCategoriesWrapper>
        </Container>
    );
};

export default ProvidersGrouped;
