import {Text} from '@weddesign/themes';
import {Modal} from '@weddesign/components';

import {ModalContent} from './styles';

type ConfirmationModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: () => void;
    onNoPress: () => void;
    yesText?: string;
    noText?: string;
    message?: string;
};

const StatusChangeModal = ({
    isVisible,
    onBackdropPress,
    message = 'Are you sure you want to proceed?',
}: ConfirmationModalProps) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <ModalContent>
                <Text.Bold size={20} style={{textAlign: 'center'}}>
                    {message}
                </Text.Bold>
            </ModalContent>
        </Modal>
    );
};

export default StatusChangeModal;
