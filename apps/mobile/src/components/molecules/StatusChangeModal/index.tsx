import {GuestStatusDot, Modal} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {GuestStatuses} from '@weddesign/enums';
import {Text} from '@weddesign/themes';

import {ModalContent, StatusItem, StatusList} from './styles';

type StatusChangeModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onStatusSelect: (status: number) => void;
};

const StatusChangeModal = ({
    isVisible,
    onBackdropPress,
    onStatusSelect,
}: StatusChangeModalProps) => {
    const {t} = useTranslation('guestList');
    const statuses = [
        {key: GuestStatuses.Created, label: t('statusModal.created')},
        {key: GuestStatuses.Invited, label: t('statusModal.invited')},
        {key: GuestStatuses.Accepted, label: t('statusModal.accepted')},
        {key: GuestStatuses.Rejected, label: t('statusModal.rejected')},
    ];

    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
            <ModalContent>
                <Text.SemiBold size={24}>{t('statusModal.title')}</Text.SemiBold>
                <StatusList>
                    {statuses.map((status) => (
                        <StatusItem
                            key={status.key}
                            onPress={() => onStatusSelect(status.key)}
                        >
                            <GuestStatusDot status={status.key} />
                            <Text.SemiBold>{status.label}</Text.SemiBold>
                        </StatusItem>
                    ))}
                </StatusList>
            </ModalContent>
        </Modal>
    );
};

export default StatusChangeModal;
