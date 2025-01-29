import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const InputsRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 48%;
    gap: 10px;
`;

export const RadioContainer = styled.View`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Row = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
