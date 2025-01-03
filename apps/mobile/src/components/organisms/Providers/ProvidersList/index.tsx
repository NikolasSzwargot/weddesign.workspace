import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {
    BackgroundEllipse,
    CustomOverlay,
    CustomSearchBar,
    Header,
    IconButton,
    LoadingSpinner,
} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {Colors, ErrorRoutes, HomeRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';
import {ProviderDto} from '@shared/dto';

import {WeddesignConfirmationModal} from '../../../molecules';
import {useRouting} from '../../../providers';
import {useProvidersByStarsInCategory} from '../../../../api/Providers/useGroupedByStarsInCategory';

import {
    Container,
    ProvidersListWrapper,
    SearchBarWrapper,
    CategoryName,
} from './styles';

const GuestList = () => {
    const {router} = useRouting();
    const {t} = useTranslation('providers');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProviderDto | null>(null);
    const [confirmationModalText, setConfirmationModalText] = useState('');

    const category = router.location.state;

    const {
        data: providersGroupedByStars,
        isLoading,
        isError,
        isFetching,
    } = useProvidersByStarsInCategory(category.id);

    const isDeleting = false;

    const handleSuccess = () => {
        console.log('Success');
    };

    const handleError = () => {
        router.navigate(ErrorRoutes.GENERAL, 'providers');
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
            <ProvidersListWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                <CategoryName>
                    <Text.SemiBold size={32}>{category.name}</Text.SemiBold>
                </CategoryName>

                {isLoading ? (
                    <LoadingSpinner
                        color={Colors.LightPurple}
                        msg={t('shared:spinnerMessage')}
                    />
                ) : (
                    <>
                        <TouchableWithoutFeedback
                            onPress={Keyboard.dismiss}
                            accessible={false}
                        >
                            <View>
                                <SearchBarWrapper>
                                    <CustomSearchBar
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        placeholder={t(
                                            'providersList.searchPlaceholder',
                                        )}
                                    />
                                    <IconButton
                                        Icon={Icons.Filter}
                                        fillColor={Colors.WhiteSmokeDarker}
                                        onPress={() => console.log('clicked Filter')}
                                    />
                                    <IconButton
                                        Icon={Icons.AddPerson}
                                        fillColor={Colors.LightPurple}
                                        onPress={() =>
                                            //@TODO: zamienić na przejście do dodawania
                                            console.log('Dodawanie podwykonawcy')
                                        }
                                    />
                                </SearchBarWrapper>
                            </View>
                        </TouchableWithoutFeedback>
                        {/*TODO: Dodać section list*/}

                        <CustomOverlay
                            isVisible={isDeleting || isFetching}
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
            </ProvidersListWrapper>
        </Container>
    );
};

export default GuestList;
