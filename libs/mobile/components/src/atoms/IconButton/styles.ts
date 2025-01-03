import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

type ButtonVariant = 'roundFloating' | 'square';

type VariantProps = {
    backgroundColor?: string;
    variant?: ButtonVariant;
};

export const ButtonContainer = styled.TouchableOpacity<VariantProps>`
    ${({variant, backgroundColor}) => {
        switch (variant) {
            case 'roundFloating':
                return `
                    position: absolute;
                    bottom: 24px;
                    right: 24px;
                    width: 56px;
                    height: 56px;
                    border-radius: 28px;
                    background-color: ${backgroundColor || Colors.Pink};
                    justify-content: center;
                    align-items: center;
                    elevation: 3;
        `;
            case 'square':
            default:
                return `
                    justify-content: center;
                    align-items: center;
                    height: 44px;
                    min-width: 44px;
                    background-color: ${backgroundColor || 'transparent'};
                    padding-left: 7px;
                    padding-right: 7px;
                    margin-right: 6px;
                    margin-left: 6px;
                    border-radius: 8px;
        `;
        }
    }}
`;
