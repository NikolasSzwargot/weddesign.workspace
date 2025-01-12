import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    min-height: 805px;
    justify-content: center;
    align-items: center;
`;

export const TaskFormWrapper = styled.View`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    margin-top: 20px;
`;

export const FormInputWrapper = styled.View`
    justify-content: flex-start;
    margin-top: 25%;
    padding-left: 20px;
    padding-right: 20px;
`;

export const InputRow = styled.View`
    margin-bottom: 12px;
    width: 100%;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
`;

export const ButtonRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
    gap: 10px;
    margin-bottom: 16px;
    width: 100%;
`;

export const ErrorArea = styled.View`
    min-height: 20px;
`;
