import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ButtonContainer, ButtonText} from './styles';

type ButtonProps = TouchableOpacityProps & {
    variant?: 'primary' | 'secondary' | 'secondaryFilled';
};

const Button = ({variant = 'primary', children, ...props}: ButtonProps) => {
    return (
        <ButtonContainer variant={variant} {...props}>
            <ButtonText variant={variant}>{children}</ButtonText>
        </ButtonContainer>
    );
};

export default Button;
