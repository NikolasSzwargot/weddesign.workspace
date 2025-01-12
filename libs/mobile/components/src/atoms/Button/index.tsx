import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {ButtonContainer, ButtonText} from './styles';

type ButtonProps = TouchableOpacityProps & {
    variant?:
        | 'primary'
        | 'secondary'
        | 'gray-out'
        | 'pink-out'
        | 'secondaryFilled'
        | 'yellow'
        | 'yellow-out';
    size?: 'big' | 'medium' | 'small';
};

const Button = ({
    variant = 'primary',
    children,
    size = 'big',
    ...props
}: ButtonProps) => {
    return (
        <ButtonContainer
            variant={variant}
            size={size}
            {...props}
            style={props.style}
        >
            <ButtonText variant={variant} size={size}>
                {children}
            </ButtonText>
        </ButtonContainer>
    );
};

export default Button;
