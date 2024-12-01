import React from 'react';
import {Modal} from 'react-native';
import {CustomOverlay} from '../../atoms';
import {ButtonContainer, ModalContent} from './styles';
import {Button} from '../../atoms';
import {Text} from '@weddesign/themes';
type ConfirmationModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: () => void;
    onNoPress: () => void;
    yesText?: string;
    noText?: string;
    message?: string;
};

const CustomConfirmationModal = ({
    isVisible,
    onBackdropPress,
    onYesPress,
    onNoPress,
    yesText = 'Yes',
    noText = 'No',
    message = 'Are you sure you want to proceed?',
}: ConfirmationModalProps) => {
    return (
        <Modal
            visible={isVisible}
            onRequestClose={onBackdropPress}
            transparent={true}
        >
            <CustomOverlay
                isVisible={isVisible}
                onBackdropPress={onBackdropPress}
                variant="bottom"
            >
                <ModalContent>
                    <Text.Bold size={20}>{message}</Text.Bold>
                    <ButtonContainer>
                        <Button onPress={onYesPress}>{yesText}</Button>
                        <Button onPress={onNoPress} variant="secondaryFilled">
                            {noText}
                        </Button>
                    </ButtonContainer>
                </ModalContent>
            </CustomOverlay>
        </Modal>
    );
};

export default CustomConfirmationModal;
