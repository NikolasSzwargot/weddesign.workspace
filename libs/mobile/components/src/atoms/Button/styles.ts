import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

type VariantProps = {
    variant: 'primary' | 'secondary' | 'gray-out' | 'pink-out';
    size?: 'big' | 'medium' | 'small';
    disabled?: boolean;
};
export const ButtonContainer = styled.TouchableOpacity<VariantProps>`
    padding: 10px 20px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${({variant, disabled}) => {
        switch (variant) {
            case 'secondary':
                return `
                    background-color: ${disabled ? Colors.Gray : Colors.Black};
                    border: 1px solid ${disabled ? Colors.Gray : Colors.Black};
                `;
            case 'gray-out':
                return `
                    background-color: ${Colors.GrayOut};
                    border: 1px solid ${Colors.GrayOut};
                `;
            case 'pink-out':
                return `
                    background-color: ${Colors.PinkLightest};
                    border: 1px solid ${Colors.PinkLightest};
            `;
            case 'primary':
            default:
                return `
                    background-color: ${
                        disabled ? Colors.PinkLighter : Colors.PinkDark
                    };
                `;
        }
    }}

    ${({size}) => {
        switch (size) {
            case 'small':
                return `
                    height: 40px;
                `;
            case 'medium':
                return `
                    height: 48px;
                `;
            case 'big':
                return `
                    height: 53px;
                `;
            default:
                return `
                    height: 53px;
                `;
        }
    }}
`;

export const ButtonText = styled.Text<VariantProps>`
    font-weight: bold;
    line-height: 20px;

    ${({variant, disabled}) => {
        switch (variant) {
            case 'secondary':
            case 'gray-out':
            case 'pink-out':
                return `
                    color: ${Colors.White};
                `;
            case 'primary':
            default:
                return `
                    color: ${disabled ? Colors.WhiteDark : Colors.White};
                `;
        }
    }}

    ${({size}) => {
        switch (size) {
            case 'small':
                return `
                    font-size: 12px;
                `;
            case 'medium':
                return `
                    font-size: 14px;
                `;
            case 'big':
                return `
                    font-size: 16px;
                `;
            default:
                return `
                    font-size: 16px;
                `;
        }
    }}
`;
