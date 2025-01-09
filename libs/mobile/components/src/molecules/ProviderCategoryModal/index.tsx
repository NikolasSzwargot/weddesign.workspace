import {ButtonContainer, ModalContent, Row} from './styles';
import {Button, Input, Modal} from '../../atoms';
import {Text} from '@weddesign/themes';
import {useState} from 'react';
import {ProviderIconDropdown} from '@weddesign/components';
import {CreateProviderCategoryDto} from '@shared/dto';

type ProviderCategoryModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: ({iconId, name}: CreateProviderCategoryDto) => void;
    onNoPress: () => void;
    yesText?: string;
    noText?: string;
    message?: string;
    placeholder?: string;
};

const ProviderCategoryModal = ({
    isVisible,
    onBackdropPress,
    onYesPress,
    onNoPress,
    yesText = 'Yes',
    noText = 'No',
    message = 'Add category',
    placeholder = 'Category Name',
}: ProviderCategoryModalProps) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedIconId, setSelectedIconId] = useState(16);

    const resetState = () => {
        setCategoryName('');
        setSelectedIconId(16);
    };

    const handleClose = () => {
        resetState();
        onNoPress();
    };

    const handleBackdrop = () => {
        resetState();
        onBackdropPress();
    };

    const handleYes = () => {
        onYesPress({iconId: selectedIconId, name: categoryName});
        resetState();
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={handleBackdrop}>
            <ModalContent>
                <Text.Bold size={20} style={{textAlign: 'center'}}>
                    {message}
                </Text.Bold>
                <Row>
                    <ProviderIconDropdown
                        value={selectedIconId}
                        onSelect={(id) => setSelectedIconId(id)}
                    />
                    <Input
                        placeholder={placeholder}
                        value={categoryName}
                        handleChange={(text) => setCategoryName(text)}
                    />
                </Row>
                <ButtonContainer>
                    <Button onPress={() => handleYes()}>{yesText}</Button>
                    <Button onPress={handleClose} variant="secondaryFilled">
                        {noText}
                    </Button>
                </ButtonContainer>
            </ModalContent>
        </Modal>
    );
};

export default ProviderCategoryModal;
