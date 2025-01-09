import {ProviderCategoryModal} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {CreateProviderCategoryDto} from '@shared/dto';

type WeddesignProviderCategoryModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: ({iconId, name}: CreateProviderCategoryDto) => void;
    onNoPress: () => void;
};

const WeddesignProviderCategoryModal = ({
    isVisible,
    onBackdropPress,
    onYesPress,
    onNoPress,
}: WeddesignProviderCategoryModalProps) => {
    const {t} = useTranslation('shared');
    return (
        <ProviderCategoryModal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            onYesPress={onYesPress}
            onNoPress={onNoPress}
            yesText={t('providerCategoryModal.ok')}
            noText={t('providerCategoryModal.noText')}
            message={t('providerCategoryModal.title')}
            placeholder={t('providerCategoryModal.placeholder')}
        />
    );
};

export default WeddesignProviderCategoryModal;
