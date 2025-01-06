import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

export const ErrorWrapper = styled.View`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    margin-top: 10px;
`;

export const ContentWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 25%;
    gap: 10px;
`;
