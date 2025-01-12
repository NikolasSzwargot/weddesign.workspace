import styled from 'styled-components/native';

export const ModalContainer = styled.View<{height?: string}>`
    flex: 1;
    background-color: white;
    padding: 20px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${({height}) => height || '320px'};
    flex-direction: column;
    gap: 10px;
`;

export const ModalRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;
