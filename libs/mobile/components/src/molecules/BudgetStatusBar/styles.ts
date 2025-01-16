import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const StatusBarWrapper = styled.View`
    background-color: ${Colors.White};
    border-radius: 10px;
    padding: 10px;
    width: 95%;
    max-width: 95%;
`;

export const StatusBarContainer = styled.View`
    background-color: ${Colors.LightGray};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    width: 100%;
    height: 16px;
    border-radius: 8px;
    overflow: hidden;
`;

export const StatusSegment = styled.View<{widthPercentage: number; color: string}>`
    height: 100%;
    width: ${({widthPercentage}) => `${widthPercentage}%`};
    background-color: ${({color}) => color};
`;
