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
    max-height: 300px;
`;

export const StatusList = styled.View`
    width: 100%;
`;

export const StatusItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    gap: 10px;
`;
