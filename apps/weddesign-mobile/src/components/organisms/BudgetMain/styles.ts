import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const BudgetMainWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 20px;
`;

export const BudgetMainFrame = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 18px;
    padding: 10px 30px 0 30px;
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 10px 10px 10px;
    width: 100%;
    justify-content: space-between;
`;

export const InfoTextWrapper = styled.View`
    flex-direction: column;
    justify-content: center;
`;
