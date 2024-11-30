import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const BudgetMainWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const BudgetMainFrame = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 20px 30px 20px 30px;
`;

export const SeparatorContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;

export const ShortSeparatorLine = styled.View`
    width: 40px;
    height: 1px;
    background-color: #e0e0e0;
    margin-right: 7px;
    margin-left: 7px;
`;

export const LongSeparatorLine = styled.View`
    flex: 1;
    height: 1px;
    background-color: #e0e0e0;
    margin-left: 10px;
`;

export const SeparatorText = styled.Text`
    font-size: 16px;
    color: #e0e0e0;
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    justify-content: space-between;
`;
