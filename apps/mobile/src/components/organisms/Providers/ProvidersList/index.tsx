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
import {Colors, ErrorRoutes} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

import {WeddesignConfirmationModal} from '../../../molecules';
import {useRouting} from '../../../providers';

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
    const [selectedItem, setSelectedItem] = useState<null>(null); //@TODO: Zamienić na DTO | null
    const [confirmationModalText, setConfirmationModalText] = useState('');

    //TODO: Wyciągać id grupy podwykonawców i użyć do zaciągnięcia listy
    const routerState = router.location.state;

    const isLoading = false;
    const isDeleting = false;
    const isFetching = false;
    const isError = false;

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
                <Header />
                <CategoryName>
                    {/*TODO: Zamienić na category.name*/}
                    <Text.SemiBold size={32}>Zdjęcia</Text.SemiBold>
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
                                        placeholder={t('searchPlaceholder')}
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

                        {/*TODO: Użyć modala do usuwania podwykonawcy*/}
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
