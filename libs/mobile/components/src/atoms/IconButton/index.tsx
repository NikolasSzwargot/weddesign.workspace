import {ButtonContainer} from './styles';
import {SvgProps} from 'react-native-svg';
import React from 'react';
import {Colors} from '@weddesign/enums';

type IconButtonProps = {
    Icon: React.FC<SvgProps>;
    onPress: () => void;
    fillColor?: Colors;
};

const IconButton = ({Icon, onPress, fillColor}: IconButtonProps) => {
    return (
        <ButtonContainer onPress={onPress} backgroundColor={fillColor}>
            <Icon />
        </ButtonContainer>
    );
};

export default IconButton;
