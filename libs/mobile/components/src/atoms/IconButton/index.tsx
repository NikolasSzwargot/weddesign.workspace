import {ButtonContainer} from './styles';
import {SvgProps} from 'react-native-svg';
import React from 'react';

type IconButtonProps = {
    Icon: React.FC<SvgProps>;
    onPress: () => void;
};

const IconButton = ({Icon, onPress}: IconButtonProps) => {
    return (
        <ButtonContainer onPress={onPress}>
            <Icon />
        </ButtonContainer>
    );
};

export default IconButton;
