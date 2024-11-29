import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const StatusBarWrapper = styled.View`
    background-color: ${Colors.White};
    border-radius: 10px;
    padding: 10px;
    width: 90%;
`;

export const StatusBarContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15px;
    border-radius: 8px;
    overflow: hidden;
`;

export const StatusSegment = styled.View<{widthPercentage: number; color: string}>`
    height: 100%;
    width: ${({widthPercentage}) => `${widthPercentage}%`};
    background-color: ${({color}) => color};
`;

export const StatusText = styled.Text`
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
    color: black;
    font-weight: bold;
`;
