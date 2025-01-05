import styled from 'styled-components/native';

export const ExpenseItemContainer = styled.TouchableOpacity`
    width: 95%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 5px 0 15px;
    padding: 5px 0 5px 0;
    border-bottom-color: #ececec;
`;

export const ExpenseInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const ExpenseRightContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
`;

export const ExpenseName = styled.Text`
    font-size: 14px;
    margin-left: 10px;
    font-weight: 500;
    color: #333;
`;
