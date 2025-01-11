import styled from 'styled-components/native';

type VariantProps = {
    variant: 'home' | 'guests' | 'budget' | 'providers' | 'tasks';
};

export const EllipseContainer = styled.View<VariantProps>`
    position: absolute;
    z-index: -1;

    ${({variant}) => {
        switch (variant) {
            case 'home':
                return `
                    width: 120%;
                    height: 80%;
                    border-radius: 210px;
                    top: -52%;
                `;
            case 'guests':
            case 'budget':
            case 'providers':
            default:
                return `
                    width: 150%;
                    height: 150%;
                    border-radius: 280px;
                    top: -133%;
                `;
        }
    }}
`;
