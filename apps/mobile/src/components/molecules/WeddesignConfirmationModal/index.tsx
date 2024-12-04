import {CustomConfirmationModal} from '@weddesign/components';
import {useTranslation} from 'react-i18next';

type WeddesignConfirmationModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: () => void;
    onNoPress: () => void;
    message?: string;
};

const WeddesignConfirmationModal = ({
    isVisible,
    onBackdropPress,
    onYesPress,
    onNoPress,
    message,
}: WeddesignConfirmationModalProps) => {
    const {t} = useTranslation('shared');
    return (
        <CustomConfirmationModal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            onYesPress={onYesPress}
            onNoPress={onNoPress}
            yesText={t('confirmationModal.yesText')}
            noText={t('confirmationModal.noText')}
            message={message ? message : t('confirmationModal.message')}
        />
    );
};

export default WeddesignConfirmationModal;
