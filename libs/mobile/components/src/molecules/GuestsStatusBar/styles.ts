import styled from 'styled-components/native';

export const StatusBarWrapper = styled.View`
    background-color: #fafafa;
    border-radius: 10px;
    padding: 10px;
    width: 90%;
    //margin: 10px auto;
`;

export const StatusBarContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15px;
    //background-color: #f0f0f0;
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
    color: #333;
    font-weight: bold;
`;
