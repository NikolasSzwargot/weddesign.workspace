import styled from 'styled-components/native';

export const ModalContent = styled.View`
    flex: 1;
    background-color: white;
    padding: 20px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 200px;
`;

export const Message = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

export const ButtonContainer = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
    gap: 10px;
    width: 50%;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;
