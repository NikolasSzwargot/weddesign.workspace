import {ButtonContainer, ModalContent, Row} from './styles';
import {Button, Input, Modal} from '../../atoms';
import {Text} from '@weddesign/themes';
import {useState} from 'react';
import {ProviderIconDropdown} from '@weddesign/components';

type ProviderCategoryModalProps = {
    isVisible: boolean;
    onBackdropPress: () => void;
    onYesPress: () => void;
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
    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
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
                    <Button onPress={onYesPress}>{yesText}</Button>
                    <Button onPress={onNoPress} variant="secondaryFilled">
                        {noText}
                    </Button>
                </ButtonContainer>
            </ModalContent>
        </Modal>
    );
};

export default ProviderCategoryModal;
