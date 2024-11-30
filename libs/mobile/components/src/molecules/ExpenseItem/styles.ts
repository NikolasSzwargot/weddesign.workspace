import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const ExpenseItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom-color: #ececec;
`;

export const ExpenseInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const ExpenseName = styled.Text`
    font-size: 14px;
    margin-left: 10px;
    font-weight: 500;
    color: #333;
`;

interface CatDotProps {
    color: Colors;
}

export const StatusDot = styled.View<CatDotProps>`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${({color}) => color};
    border-radius: 20px;
`;
