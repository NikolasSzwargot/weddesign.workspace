import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 805px;
    justify-content: center;
    align-items: center;
`;

export const TaskListWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 10px;
`;

export const PageWrapper = styled.View`
    margin-top: 15%;
`;

export const StatusBarWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100vw;
    margin-top: 20px;
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    justify-content: space-between;
`;
