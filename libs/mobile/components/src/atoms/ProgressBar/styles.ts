import {Colors} from '@weddesign/enums';
import styled from 'styled-components/native';

export const ProgressBarContainer = styled.View<{backgroundColor: Colors}>`
    height: 17px;
    width: 100%;
    background-color: ${({backgroundColor}) => backgroundColor};
    border-radius: 20px;
`;

export const ProgressFill = styled.View<{
    fillColor: Colors;
    fillPercentage: number;
}>`
    height: 100%;
    width: ${({fillPercentage}) => `${fillPercentage}%`};
    background-color: ${({fillColor}) => fillColor};
    border-radius: 20px;
`;
