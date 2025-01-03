import {ButtonContainer, ModalContent} from './styles';
import {Button, Modal} from '../../atoms';
import {Text} from '@weddesign/themes';

type ConfirmationModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: () => void;
    onNoPress: () => void;
    yesText?: string;
    noText?: string;
    message?: string;
    warning?: string;
};

const CustomConfirmationModal = ({
    isVisible,
    onBackdropPress,
    onYesPress,
    onNoPress,
    yesText = 'Yes',
    noText = 'No',
    message = 'Are you sure you want to proceed?',
    warning,
}: ConfirmationModalProps) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <ModalContent>
                <Text.Bold size={20} style={{textAlign: 'center'}}>
                    {message}
                </Text.Bold>
                {warning && (
                    <Text.RegularPink style={{textAlign: 'center'}}>
                        {warning}
                    </Text.RegularPink>
                )}
                <ButtonContainer>
                    <Button onPress={onYesPress}>{yesText}</Button>
                    <Button onPress={onNoPress} variant="secondaryFilled">
                        {noText}
                    </Button>
                </ButtonContainer>
            </ModalContent>
        </Modal>
    );
};

export default CustomConfirmationModal;
