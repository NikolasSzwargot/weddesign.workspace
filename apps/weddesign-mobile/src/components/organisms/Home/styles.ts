import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    align-items: center;
    margin-top: 20px;
`;

export const HomeWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100vw;
    height: 100%;
    margin-top: 20px;
`;

export const MainFrame = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;
`;
