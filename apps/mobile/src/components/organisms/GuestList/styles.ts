import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const GuestListWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const StatusBarWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100vw;
    margin-top: 20px;
`;

export const CounterWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    justify-content: space-between;
`;
