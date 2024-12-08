import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

type VariantProps = {
    variant: 'primary' | 'secondary' | 'secondaryFilled';
    disabled?: boolean;
};

export const ButtonContainer = styled.TouchableOpacity<VariantProps>`
    padding: 15px 25px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 53px;
    height: 53px;

    ${({variant, disabled}) => {
        switch (variant) {
            case 'secondary':
                return `
                    background-color: ${disabled ? Colors.LightGray : Colors.White};
                    border: 1px solid ${disabled ? Colors.Gray : Colors.PinkDark};
                `;
            case 'secondaryFilled':
                return `
                    background-color: ${
                        disabled ? Colors.PinkLighter : Colors.PinkLightest
                    };
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
`;

export const ButtonText = styled.Text<VariantProps>`
    font-size: 16px;
    font-weight: bold;

    ${({variant, disabled}) => {
        switch (variant) {
            case 'secondary':
                return `
                    color: ${disabled ? Colors.Gray : Colors.PinkDark};
                `;
            case 'primary':
            case 'secondaryFilled':
            default:
                return `
                    color: ${disabled ? Colors.WhiteDark : Colors.White};
                `;
        }
    }}
`;
