import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 805px;
    justify-content: center;
    align-items: center;
`;

export const ProvidersListWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 10px;
`;

export const SearchBarWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    width: 100%;
    justify-content: space-between;
`;
