import {ButtonContainer} from './styles';
import {SvgProps} from 'react-native-svg';
import React from 'react';
import {Colors} from '@weddesign/enums';

type ButtonVariant = 'roundFloating' | 'square';

type IconButtonProps = {
    Icon: React.FC<SvgProps>;
    onPress: () => void;
    fillColor?: Colors;
    variant?: ButtonVariant;
};

const IconButton = ({
    Icon,
    onPress,
    fillColor,
    variant = 'square',
}: IconButtonProps) => {
    return (
        <ButtonContainer
            onPress={onPress}
            backgroundColor={fillColor}
            variant={variant}
        >
            <Icon />
        </ButtonContainer>
    );
};

export default IconButton;
